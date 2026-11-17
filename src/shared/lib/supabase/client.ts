import { createClient } from '@supabase/supabase-js';

import { env } from '@/shared/config/env';
import type { Database } from '@/types/database.types';

// ES 모듈은 한 번만 평가되므로 모듈 스코프에서 만든 인스턴스가 앱 전체의 싱글턴이 된다.
// 로그인 기능이 없어 세션 저장과 토큰 갱신은 끈다.
export const supabase = createClient<Database>(env.supabaseUrl, env.supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
