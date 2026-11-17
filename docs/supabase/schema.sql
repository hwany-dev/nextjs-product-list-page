-- products 테이블과 RLS 정책
-- Supabase 대시보드 > SQL Editor에서 실행한다. 여러 번 실행해도 안전하게 작성했다.

create table if not exists public.products (
  id            uuid        primary key default gen_random_uuid(),
  title         text        not null,
  type          text        not null check (type in ('single', 'pass')),
  price         integer     not null check (price >= 0),
  -- 할인가. null이면 할인 없음. 할인율은 저장하지 않고 price와 sale_price로 계산한다.
  sale_price    integer     check (sale_price >= 0 and sale_price < price),
  thumbnail_url text        not null,
  season        integer,
  is_visible    boolean     not null default true,
  sort_order    integer     not null default 0,
  created_at    timestamptz not null default now()
);

comment on table public.products is '히든카이스 스토어 교재 상품';

-- 목록 조회 정렬(sort_order asc, created_at desc)과 노출 조건에 맞춘 부분 인덱스
create index if not exists products_visible_sort_idx
  on public.products (sort_order, created_at desc)
  where is_visible;

-- ---------------------------------------------------------------------------
-- RLS
-- anon 키는 브라우저에 노출되므로 RLS가 실제 보안 경계다.
-- 익명 사용자는 노출 중인 상품을 읽기만 할 수 있고, 쓰기 정책은 두지 않는다(= 모두 거부).
-- ---------------------------------------------------------------------------
alter table public.products enable row level security;

drop policy if exists "Anyone can read visible products" on public.products;
create policy "Anyone can read visible products"
  on public.products
  for select
  to anon, authenticated
  using (is_visible = true);

-- 프로젝트 설정에 따라 새 테이블이 Data API에 자동 노출되지 않을 수 있어 권한을 명시한다.
grant select on public.products to anon, authenticated;
