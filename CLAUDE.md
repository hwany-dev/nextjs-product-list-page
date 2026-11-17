# CLAUDE.md

이 파일은 이 저장소에서 작업하는 Claude(AI 코딩 도우미)를 위한 프로젝트 안내서다.
작업 전에 반드시 끝까지 읽고 아래 규칙을 따른다.

---

## 1. 프로젝트 개요

- **무엇**: "히든카이스(HIDDEN KICE)" 교재 스토어의 **상품 목록 페이지(PLP)** 구현
- **성격**: 채용 과제. 기능 완성도와 함께 **코드 구조와 커밋 히스토리**가 평가 대상이다.
- **디자인 원본**: `docs/design/plp.svg`(1440 × 2400, Figma에서 내보낸 SVG)
- **범위**: 화면에 보이는 부분 위주로 만든다. 장바구니, 알림, 로그인 등은 **UI만** 만들고 동작은 구현하지 않는다.

### 과제 요구사항 (원문 요약)

1. Next.js로 작업
2. 화면에 보이는 부분 위주로 작업
3. GitHub에 올리고 Vercel로 배포
4. Supabase에 교재 정보를 더미로 넣고 **CSR로 불러와** 보여준다
5. 확장 가능한 폴더 구조로 잡는다(면접에서 설명해야 함)
6. AI 사용 가능

---

## 2. 기술 스택

| 영역 | 선택 | 비고 |
|---|---|---|
| 프레임워크 | Next.js (App Router) + TypeScript | `src/` 디렉터리 사용 |
| 스타일 | SCSS Modules (`*.module.scss`) | 디자인 토큰은 `src/shared/styles/_tokens.scss` |
| 데이터 | Supabase (`@supabase/supabase-js`) | 브라우저 클라이언트만 사용 |
| 서버 상태 | TanStack Query (`@tanstack/react-query`) | 캐싱, 로딩/에러 상태, 페이지 전환 처리 |
| 배포 | Vercel | GitHub `main` 브랜치에 연결 |
| 품질 | ESLint, Prettier, `tsc --noEmit` | 커밋 전에 통과해야 함 |

### 스택 결정 원칙

- 새 라이브러리는 **꼭 필요할 때만** 추가하고, 추가할 때는 이유를 커밋 메시지 본문에 쓴다.
- styled-components 같은 CSS-in-JS는 쓰지 않는다(App Router에서 별도 설정이 필요하고, SCSS Modules로 충분하다).

---

## 3. 데이터 패칭 규칙 (CSR 필수)

과제가 **CSR로 불러오기**를 명시하므로 아래를 지킨다.

- 상품 데이터는 **클라이언트 컴포넌트(`'use client'`)에서** TanStack Query로 불러온다.
- Server Component, `getServerSideProps`, Route Handler, Server Action에서 상품 데이터를 미리 불러오지 **않는다**.
- `page.tsx`는 레이아웃 조립만 하는 얇은 파일로 두고, 데이터를 쓰는 섹션은 클라이언트 컴포넌트로 분리한다.
- Supabase 호출은 컴포넌트에서 직접 하지 않는다. 반드시 `api` 레이어 함수를 거친다.
  - 흐름: `UI 컴포넌트 → hooks(useQuery) → api 함수 → supabase client`
- 로딩 상태(스켈레톤), 빈 결과, 에러 상태를 모두 화면에 처리한다.

---

## 4. 폴더 구조

기능(feature) 단위로 나누고, 여러 기능이 같이 쓰는 것은 `shared`에 둔다.
(Feature-Sliced Design을 단순화한 형태)

```
src/
├── app/                          # 라우팅과 레이아웃만 담당
│   ├── layout.tsx                # Header/Footer, Providers 감싸기
│   ├── page.tsx                  # 스토어 메인(PLP) 조립
│   ├── providers.tsx             # QueryClientProvider ('use client')
│   └── globals.scss
│
├── features/                     # 도메인 기능 단위
│   └── product/
│       ├── api/
│       │   └── getProducts.ts    # Supabase 쿼리 (검색·필터·페이지네이션)
│       ├── hooks/
│       │   └── useProducts.ts    # useQuery 래핑, queryKey 관리
│       ├── components/
│       │   ├── ProductGrid/
│       │   ├── ProductCard/
│       │   ├── ProductFilter/    # 전체 | 패스 | 단품 탭
│       │   ├── ProductSearch/
│       │   └── ProductListSection/  # 위 컴포넌트를 묶는 클라이언트 섹션
│       ├── model/
│       │   ├── types.ts          # Product, ProductType 등 도메인 타입
│       │   └── mapper.ts         # DB row(snake_case) → 도메인(camelCase) 변환
│       ├── lib/
│       │   └── price.ts          # 할인율 계산, 가격 포맷
│       └── index.ts              # 외부에 공개할 것만 export (public API)
│
├── widgets/                      # 여러 feature를 조합한 큰 화면 블록
│   ├── Header/                   # GNB
│   ├── HeroCarousel/             # 메인 배너 캐러셀 (1/5)
│   └── Footer/
│
├── shared/                       # 도메인과 무관한 공용 코드
│   ├── ui/                       # Button, Pagination, Skeleton, Icon 등
│   ├── lib/
│   │   └── supabase/
│   │       └── client.ts         # createClient 싱글턴
│   ├── config/
│   │   └── env.ts                # 환경변수 검증 후 export
│   ├── hooks/                    # useDebounce 등
│   └── styles/
│       ├── _tokens.scss          # 색상, 간격, 폰트, 브레이크포인트
│       └── _mixins.scss
│
└── types/
    └── database.types.ts         # Supabase CLI로 생성한 DB 타입

docs/
├── design/plp.svg                # 디자인 원본
└── supabase/
    ├── schema.sql                # 테이블 + RLS 정책
    └── seed.sql                  # 더미 교재 데이터
```

### 의존 방향 규칙 (반드시 지킬 것)

```
app → widgets → features → shared
```

- 아래 레이어는 위 레이어를 import하지 않는다(예: `shared`에서 `features`를 import하면 안 됨).
- feature끼리 서로 직접 import하지 않는다. 필요하면 `widgets`나 `app`에서 조합한다.
- 다른 레이어에서 feature를 쓸 때는 `features/product/index.ts`를 통해서만 import한다.
- 경로 별칭: `@/*` → `src/*`

### 확장 시나리오 (면접 설명용)

- **상품 상세(PDP) 추가**: `app/products/[id]/page.tsx` 추가, `features/product/api/getProductById.ts` 추가. 기존 코드 수정 없이 확장된다.
- **장바구니 기능**: `features/cart/`를 새로 만들고, `ProductCard`의 담기 버튼과 `Header`의 장바구니 배지는 `widgets` 레벨에서 연결한다.
- **챌린지, AI OMR WORK 메뉴**: `app/challenge/`, `features/challenge/`처럼 같은 패턴으로 추가한다.
- **백엔드 교체**: Supabase 의존은 `shared/lib/supabase`와 각 feature의 `api/`에만 있으므로 그 부분만 바꾸면 된다.

---

## 5. Supabase

### 테이블: `products`

| 컬럼 | 타입 | 설명 |
|---|---|---|
| `id` | `uuid` PK, default `gen_random_uuid()` | |
| `title` | `text` not null | 예: `2026 Hidden Kice 시즌7` |
| `type` | `text` not null, check in (`'single'`, `'pass'`) | 단품 / 패스 |
| `price` | `integer` not null | 정가(원) |
| `sale_price` | `integer` null | 할인가. null이면 할인 없음 |
| `thumbnail_url` | `text` not null | Supabase Storage 또는 `public/` 경로 |
| `season` | `integer` | 시즌 번호 |
| `is_visible` | `boolean` default true | 노출 여부 |
| `sort_order` | `integer` default 0 | 정렬 순서 |
| `created_at` | `timestamptz` default `now()` | |

- **할인율은 DB에 저장하지 않고** `price`와 `sale_price`로 계산한다(`features/product/lib/price.ts`).
  - 참고: 디자인 시안의 숫자(76,000원, 5%, 64,800원)는 서로 맞지 않는다. 계산 값을 기준으로 하고, 이 판단은 README에 적는다.
- **RLS를 켜고** 익명 사용자에게 `select`만 허용한다(`is_visible = true`인 행만).
- 스키마와 시드는 `docs/supabase/*.sql`에 남겨서 누구나 재현할 수 있게 한다.

### 쿼리 규칙

- 필터: `type`이 `all`이 아니면 `.eq('type', type)`
- 검색: `.ilike('title', `%${keyword}%`)`, 입력은 300ms 디바운스
- 페이지네이션: `.range(from, to)` + `{ count: 'exact' }`. 페이지당 12개(4열 × 3행)
- 정렬: `sort_order` 오름차순, 그다음 `created_at` 내림차순
- 필터, 검색어, 페이지 값은 **URL 쿼리스트링**과 동기화한다(`?type=pass&q=시즌&page=2`). 새로고침하거나 공유해도 상태가 유지되게 하기 위함이다.

### 환경변수

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

- `.env.local`은 커밋하지 않는다. `.env.example`만 커밋한다.
- Vercel 프로젝트 설정에도 같은 값을 등록한다.
- anon key는 브라우저에 노출되는 값이므로 **RLS가 실제 보안 경계**라는 점을 기억한다. `service_role` 키는 절대 코드에 넣지 않는다.

---

## 6. 화면 구현 범위

| 영역 | 구현 수준 |
|---|---|
| Header(GNB) | 로고, 메뉴 4개(스토어 활성 상태), 아이콘 3개와 배지. 링크는 `#` 처리 |
| HeroCarousel | 슬라이드 5장, 자동 넘김 + 인디케이터(`1/5`). 이미지는 정적 에셋 |
| 검색 + 필터 탭 | 동작 구현(Supabase 쿼리와 연동). 검색어 지우기(×) 버튼 포함 |
| 상품 그리드 | 4열. 카드: 썸네일, 타입 라벨, 상품명, 정가 취소선, 할인율(주황), 판매가 |
| 페이지네이션 | 이전/다음 버튼 + 번호. 현재 페이지 강조(보라) |
| Footer | 약관 링크, 사업자 정보, Copyright (정적 텍스트) |

- 기준 해상도는 1440px 데스크톱이다. 시간이 남으면 태블릿(2열)과 모바일(1~2열) 반응형을 추가한다.
- 메인 컬러: `#7F77DD`(보라), 할인율: 주황 계열. 정확한 값은 SVG에서 뽑아 `_tokens.scss`에 정의한다.
- 이미지는 `next/image`를 쓴다. 외부 도메인(Supabase Storage)은 `next.config`의 `images.remotePatterns`에 등록한다.
- 시맨틱 마크업과 접근성: `header`/`nav`/`main`/`footer`, 이미지 `alt`, 버튼 `aria-label`, 탭에 `role="tablist"` 등.

---

## 7. 커밋 규칙 (Atomic Commit)

이 저장소는 **하나의 커밋 = 하나의 논리적 변경**을 원칙으로 한다.
커밋 히스토리만 읽어도 작업 흐름이 보여야 한다.

### 원칙

- 커밋 하나는 **한 가지 이유로만** 바뀐다. "그리고"가 들어가면 쪼갠다.
- 각 커밋 시점에서 **빌드와 타입 체크가 통과**해야 한다(중간에 깨진 커밋 금지).
- 기능 변경과 포맷 변경(리네이밍, 정렬, 들여쓰기)을 섞지 않는다.
- 의존성 추가는 그것을 처음 쓰는 커밋에 포함하거나, 단독 `chore` 커밋으로 분리한다.
- Claude는 **커밋을 임의로 만들지 않는다.** 작업을 끝내면 변경 사항을 어떻게 나눠 커밋할지 **제안**하고, 사용자가 승인하면 그때 커밋한다.

### 메시지 형식 (Conventional Commits)

```
<type>(<scope>): <제목 — 한국어, 50자 이내, 마침표 없음>

<본문 — 선택. 무엇을, 왜 바꿨는지. "어떻게"는 코드가 설명한다>
```

- **type**: `feat`, `fix`, `style`(UI 스타일), `refactor`, `chore`, `docs`, `test`, `perf`, `build`, `ci`
- **scope**: `product`, `header`, `hero`, `footer`, `shared`, `supabase`, `config` 등
- 예:
  - `chore(config): Next.js + TypeScript 프로젝트 초기화`
  - `chore(config): ESLint, Prettier 설정 추가`
  - `feat(shared): Supabase 브라우저 클라이언트 추가`
  - `docs(supabase): products 테이블 스키마와 RLS 정책 추가`
  - `feat(product): 상품 목록 조회 API 함수 추가`
  - `feat(product): useProducts 쿼리 훅 추가`
  - `feat(product): ProductCard 컴포넌트 구현`
  - `feat(product): 타입 필터 탭 구현`
  - `feat(product): 검색어를 URL 쿼리스트링과 동기화`
  - `style(hero): 배너 그라데이션 오버레이 조정`

### 권장 커밋 순서

1. 프로젝트 초기화, 린트/포맷 설정, 경로 별칭
2. 디자인 토큰, 글로벌 스타일, 폰트
3. 폴더 구조 뼈대 + 레이아웃(Header/Footer 정적 UI)
4. Supabase 클라이언트, 환경변수 검증, 스키마/시드 문서
5. 상품 타입, mapper, 가격 유틸
6. 상품 조회 API, 쿼리 훅, Providers
7. ProductCard → ProductGrid → 로딩/빈 상태/에러
8. 필터 탭 → 검색 → 페이지네이션 → URL 동기화
9. HeroCarousel
10. 반응형, 접근성 보완
11. README, 배포 설정

### 커밋 전 체크리스트

```bash
npm run lint
npm run typecheck   # tsc --noEmit
npm run build
```

---

## 8. 코드 컨벤션

- 컴포넌트: `PascalCase` 폴더 + `index.tsx` + `Component.module.scss`
- 훅: `useXxx.ts`, 유틸: `camelCase.ts`
- `any` 금지. Supabase 응답은 `database.types.ts` 타입을 쓰고 mapper로 도메인 타입으로 바꾼다.
- 컴포넌트는 `export default` 대신 **named export**를 쓴다(`page.tsx`, `layout.tsx` 제외).
- 매직 넘버(페이지당 개수, 디바운스 시간 등)는 상수로 뺀다(`features/product/model/constants.ts`).
- 주석은 "왜"를 설명할 때만 쓴다.

---

## 9. 자주 쓰는 명령

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run lint
npm run typecheck
npx supabase gen types typescript --project-id <id> > src/types/database.types.ts
```

---

## 10. 제출

- 제출물: **GitHub 저장소 URL + Vercel 배포 URL**
- README에 포함할 것: 실행 방법, 기술 선택 이유, 폴더 구조 설명, CSR 처리 방식, Supabase 스키마, 디자인과 다르게 판단한 부분, AI 활용 방식
- 제출 전 확인: 배포 URL에서 데이터가 실제로 불러와지는지, 필터/검색/페이지네이션이 동작하는지, 콘솔 에러가 없는지

---

## 11. Claude에게 주는 작업 지침

- 한 번에 큰 덩어리를 만들지 말고, 위 **커밋 순서 단위로** 작업하고 멈춘다.
- 작업이 끝나면 (1) 바꾼 파일, (2) 제안 커밋 메시지, (3) 다음 단계를 짧게 알려준다.
- 사용자는 이 코드를 **면접에서 직접 설명해야 한다.** 구조나 패턴을 새로 도입할 때는 왜 그렇게 했는지 한두 문장으로 같이 설명한다.
- 확신이 없는 요구사항(디자인 수치, 동작 방식)은 추측해서 진행하지 말고 물어본다.
- 비밀 값(.env, 키)은 절대 커밋하거나 출력하지 않는다.