\c orderdatabase;
DELETE FROM orders;

INSERT INTO orders(data, vendor_id, shopper_id, order_status) VALUES (jsonb_build_object('orderDate', '2024-05-31T07:40:52.329+00:00', 'products', ARRAY['6a2212e5-af0b-4472-a724-537bdc6c571c', '20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8', 'fb31be70-f4f3-4ccc-b483-14e831dc61d1', 'e64edcc9-3262-49b8-bda4-066c34089e05']), '33d646df-1f4a-4130-8590-720f45ba4179', '92846fcb-9c73-4fc6-b652-3443874118b8', 'pending');
INSERT INTO orders(data, vendor_id, shopper_id, order_status) VALUES (jsonb_build_object('orderDate', '2024-05-30T07:40:52.329+00:00', 'products', ARRAY['fcdfc6a7-3e50-4909-818c-379f75b4320a', '86b0b448-fa22-4235-a88f-211e7619d44b', 'fcab207a-fd48-4e81-a15d-a754f49fcd15']), '33d646df-1f4a-4130-8590-720f45ba4179', '92846fcb-9c73-4fc6-b652-3443874118b8', 'confirmed');
INSERT INTO orders(data, vendor_id, shopper_id, order_status) VALUES (jsonb_build_object('orderDate', '2024-05-29T07:40:52.329+00:00', 'products', ARRAY['c5f199c9-0799-43ad-848b-f7e8e76ee0e4', 'c85ddd6d-c3ef-4ba2-8951-a6f377c4fe94', '88db3140-54d2-4f1f-a552-7454bf55dcaf']), '33d646df-1f4a-4130-8590-720f45ba4179', '92846fcb-9c73-4fc6-b652-3443874118b8', 'shipped');
INSERT INTO orders(id, data, vendor_id, shopper_id, order_status) VALUES ('45a1452a-1f4a-4130-8590-720f45ba4179', jsonb_build_object('orderDate', '2024-05-20T07:40:52.329+00:00', 'products', ARRAY['460ee6d3-e911-4b39-87f8-d342831f2b28', 'e64edcc9-3262-49b8-bda4-066c34089e05', '460ee6d3-e911-4b39-87f8-d342831f2b28']), '33d646df-1f4a-4130-8590-720f45ba4179', '92846fcb-9c73-4fc6-b652-3443874118b8', 'delivered');