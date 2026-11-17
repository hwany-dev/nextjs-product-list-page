-- 더미 교재 데이터 (schema.sql 실행 후 SQL Editor에서 실행)
-- 다시 실행하면 기존 데이터를 지우고 새로 넣는다.
--
-- 가격 규칙
--   2026 단품: 64,800원, 할인 없음      2026 패스: 76,000원 → 72,200원(5%)
--   2025 단품: 64,800원 → 45,360원(30%) 2025 패스: 76,000원 → 53,200원(30%)
--   시안의 숫자(76,000원 / 5% / 64,800원)는 서로 맞지 않아 할인율이 계산과 맞도록 판매가를 정했다.
--
-- 노출 상품 28개 = 페이지당 12개 기준 3페이지. 마지막 행은 is_visible = false로,
-- 익명 사용자에게 보이지 않아야 RLS가 정상 동작하는 것이다.

truncate table public.products;

insert into public.products
  (title, type, price, sale_price, thumbnail_url, season, is_visible, sort_order)
values
  ('2026 Hidden Kice 시즌7', 'single', 64800, null, '/images/products/hidden-kice-single.png', 7, true, 1),
  ('2026 Hidden Kice 시즌7 패스', 'pass', 76000, 72200, '/images/products/hidden-kice-pass.png', 7, true, 2),
  ('2026 Hidden Kice 시즌6', 'single', 64800, null, '/images/products/hidden-kice-single.png', 6, true, 3),
  ('2026 Hidden Kice 시즌6 패스', 'pass', 76000, 72200, '/images/products/hidden-kice-pass.png', 6, true, 4),
  ('2026 Hidden Kice 시즌5', 'single', 64800, null, '/images/products/hidden-kice-single.png', 5, true, 5),
  ('2026 Hidden Kice 시즌5 패스', 'pass', 76000, 72200, '/images/products/hidden-kice-pass.png', 5, true, 6),
  ('2026 Hidden Kice 시즌4', 'single', 64800, null, '/images/products/hidden-kice-single.png', 4, true, 7),
  ('2026 Hidden Kice 시즌4 패스', 'pass', 76000, 72200, '/images/products/hidden-kice-pass.png', 4, true, 8),
  ('2026 Hidden Kice 시즌3', 'single', 64800, null, '/images/products/hidden-kice-single.png', 3, true, 9),
  ('2026 Hidden Kice 시즌3 패스', 'pass', 76000, 72200, '/images/products/hidden-kice-pass.png', 3, true, 10),
  ('2026 Hidden Kice 시즌2', 'single', 64800, null, '/images/products/hidden-kice-single.png', 2, true, 11),
  ('2026 Hidden Kice 시즌2 패스', 'pass', 76000, 72200, '/images/products/hidden-kice-pass.png', 2, true, 12),
  ('2026 Hidden Kice 시즌1', 'single', 64800, null, '/images/products/hidden-kice-single.png', 1, true, 13),
  ('2026 Hidden Kice 시즌1 패스', 'pass', 76000, 72200, '/images/products/hidden-kice-pass.png', 1, true, 14),
  ('2025 Hidden Kice 시즌7', 'single', 64800, 45360, '/images/products/hidden-kice-single.png', 7, true, 15),
  ('2025 Hidden Kice 시즌7 패스', 'pass', 76000, 53200, '/images/products/hidden-kice-pass.png', 7, true, 16),
  ('2025 Hidden Kice 시즌6', 'single', 64800, 45360, '/images/products/hidden-kice-single.png', 6, true, 17),
  ('2025 Hidden Kice 시즌6 패스', 'pass', 76000, 53200, '/images/products/hidden-kice-pass.png', 6, true, 18),
  ('2025 Hidden Kice 시즌5', 'single', 64800, 45360, '/images/products/hidden-kice-single.png', 5, true, 19),
  ('2025 Hidden Kice 시즌5 패스', 'pass', 76000, 53200, '/images/products/hidden-kice-pass.png', 5, true, 20),
  ('2025 Hidden Kice 시즌4', 'single', 64800, 45360, '/images/products/hidden-kice-single.png', 4, true, 21),
  ('2025 Hidden Kice 시즌4 패스', 'pass', 76000, 53200, '/images/products/hidden-kice-pass.png', 4, true, 22),
  ('2025 Hidden Kice 시즌3', 'single', 64800, 45360, '/images/products/hidden-kice-single.png', 3, true, 23),
  ('2025 Hidden Kice 시즌3 패스', 'pass', 76000, 53200, '/images/products/hidden-kice-pass.png', 3, true, 24),
  ('2025 Hidden Kice 시즌2', 'single', 64800, 45360, '/images/products/hidden-kice-single.png', 2, true, 25),
  ('2025 Hidden Kice 시즌2 패스', 'pass', 76000, 53200, '/images/products/hidden-kice-pass.png', 2, true, 26),
  ('2025 Hidden Kice 시즌1', 'single', 64800, 45360, '/images/products/hidden-kice-single.png', 1, true, 27),
  ('2025 Hidden Kice 시즌1 패스', 'pass', 76000, 53200, '/images/products/hidden-kice-pass.png', 1, true, 28),
  ('[비공개] RLS 확인용 상품', 'single', 10000, null, '/images/products/hidden-kice-single.png', null, false, 29);
