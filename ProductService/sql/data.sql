\c productdatabase;
DELETE FROM product;
INSERT INTO product(id, data) VALUES ('6a2212e5-af0b-4472-a724-537bdc6c571c', jsonb_build_object('name', 'Shrek DVD', 'price', 1999, 'stock', 1, 'image', ARRAY['https://m.media-amazon.com/images/I/51JSHMYGTYL._AC_UF894,1000_QL80_.jpg']));
INSERT INTO product(id, data) VALUES ('20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8', jsonb_build_object('name', 'Shrek 2 DVD', 'price', 1999, 'stock', 1, 'image', ARRAY['https://m.media-amazon.com/images/I/71HQiOZsZ6L._AC_UF1000,1000_QL80_.jpg']));
INSERT INTO product(id, data) VALUES ('fb31be70-f4f3-4ccc-b483-14e831dc61d1', jsonb_build_object('name', 'Shrek 3 DVD', 'price', 1999, 'stock', 1, 'image', ARRAY['https://m.media-amazon.com/images/I/81uE-9vcOEL._AC_UF1000,1000_QL80_.jpg']));
INSERT INTO product(id, data) VALUES ('e64edcc9-3262-49b8-bda4-066c34089e05', jsonb_build_object('name', 'Shrek Forever After DVD', 'price', 1999, 'stock', 1, 'image', ARRAY['https://m.media-amazon.com/images/I/8148AAppyOL._AC_UF894,1000_QL80_.jpg']));