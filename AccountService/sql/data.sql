DELETE FROM account;

-- Shoppers
INSERT INTO account(id, data) VALUES ('92846fcb-9c73-4fc6-b652-3443874118b8', jsonb_build_object('email','molly@books.com', 'name','Molly Member','pwhash',crypt('mollymember','87'),'role','shopper', 'address','74 Shipley Court Saugus, MA 01906'));
INSERT INTO account(id, data) VALUES ('8e2b4bd2-1946-25c5-9796-de3baa2b0ab5', jsonb_build_object('email', 'steve@shopper.com', 'name', 'Steve Shopper', 'pwhash', crypt('steveshopper', '87'), 'role', 'shopper', 'address', '7795 Deerfield Lane Stevens Point, WI 54481'));

-- Vendors
INSERT INTO account(id, data) VALUES ('33d646df-1f4a-4130-8590-720f45ba4179', jsonb_build_object('email','vivian@books.com','name','Vivian Vendor','pwhash',crypt('vivianvendor','87'),'role','vendor', 'address', '957 Green Lake St. Ocean Springs, MS 39564', 'status', FALSE));
INSERT INTO account(id, data) VALUES ('fb31ce70-f4f3-4bcc-b493-14e8311c61d1', jsonb_build_object('email','vendor@nike.com','name','Nike Vendor','pwhash',crypt('nikevendor','87'),'role','vendor', 'address', 'One Bowerman Drive. Beaverton, OR 97005', 'status', FALSE));
INSERT INTO account(id, data) VALUES ('7312ca31-1f18-4ab5-a1ef-18ce0bd22f32', jsonb_build_object('email','vendor@google.com','name','Google Vendor','pwhash',crypt('googlevendor','87'),'role','vendor', 'address', '1600 Amphitheatre Parkway Mountain View, CA 94043', 'status', TRUE));

-- Admin
INSERT INTO account(id, data) VALUES ('da981030-0de5-4152-aeaa-5379b0abfbf2', jsonb_build_object('email','anna@books.com','name','Anna Admin','pwhash',crypt('annaadmin','87'),'role','admin', 'address','123 Main Street, Santa Cruz, CA 95060'));
