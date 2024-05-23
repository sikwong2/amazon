\c orderdatabase;
DELETE FROM orders;
INSERT INTO orders(data, vendor_id, shopper_id, order_status) VALUES (jsonb_build_object('product','20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8'), '5274eea0-6f87-4c26-b064-3cf4b823c0dd', '7ac0e5c1-e264-41a7-98e9-845ef0d77b25', 'pending');
INSERT INTO orders(data, vendor_id, shopper_id, order_status) VALUES (jsonb_build_object('product','6a2212e5-af0b-4472-a724-537bdc6c571c'), '5274eea0-6f87-4c26-b064-3cf4b823c0dd', '92846fcb-9c73-4fc6-b652-3443874118b8', 'pending');
INSERT INTO orders(data, vendor_id, shopper_id, order_status) VALUES (jsonb_build_object('product','20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8'), '5274eea0-6f87-4c26-b064-3cf4b823c0dd', '92846fcb-9c73-4fc6-b652-3443874118b8', 'pending');
INSERT INTO orders(data, vendor_id, shopper_id, order_status) VALUES (jsonb_build_object('product','fb31be70-f4f3-4ccc-b483-14e831dc61d1'), '5274eea0-6f87-4c26-b064-3cf4b823c0dd', '92846fcb-9c73-4fc6-b652-3443874118b8', 'pending');
INSERT INTO orders(data, vendor_id, shopper_id, order_status) VALUES (jsonb_build_object('product','e64edcc9-3262-49b8-bda4-066c34089e05'), '5274eea0-6f87-4c26-b064-3cf4b823c0dd', '92846fcb-9c73-4fc6-b652-3443874118b8', 'pending');