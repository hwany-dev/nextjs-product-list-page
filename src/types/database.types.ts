// docs/supabase/schema.sql 기준 DB 타입. `supabase gen types typescript` 출력 형식을 따른다.
// 스키마가 바뀌면 아래 명령으로 다시 생성한다.
//   npx supabase gen types typescript --project-id <id> > src/types/database.types.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          created_at: string;
          id: string;
          is_visible: boolean;
          price: number;
          sale_price: number | null;
          season: number | null;
          sort_order: number;
          thumbnail_url: string;
          title: string;
          type: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_visible?: boolean;
          price: number;
          sale_price?: number | null;
          season?: number | null;
          sort_order?: number;
          thumbnail_url: string;
          title: string;
          type: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_visible?: boolean;
          price?: number;
          sale_price?: number | null;
          season?: number | null;
          sort_order?: number;
          thumbnail_url?: string;
          title?: string;
          type?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database['public'];

export type Tables<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Row'];
