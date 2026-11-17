// 환경변수를 한곳에서 검증해 export한다.
// 값이 비어 있으면 Supabase 요청 단계가 아니라 앱 시작(빌드) 시점에 바로 실패하게 하려는 목적이다.
//
// NEXT_PUBLIC_ 변수는 빌드할 때 코드에 문자열로 치환된다.
// 치환은 `process.env.NEXT_PUBLIC_XXX`를 그대로 쓴 곳에서만 일어나므로 동적 키(process.env[name])로 읽지 않는다.

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `환경변수 ${name}가 설정되지 않았습니다. .env.example을 참고해 .env.local을 만들어 주세요.`,
    );
  }
  return value;
}

export const env = {
  supabaseUrl: required('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnonKey: required(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  ),
} as const;
