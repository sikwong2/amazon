\c accountdatabase;
DELETE FROM account;
INSERT INTO account(id, data) VALUES ('92846fcb-9c73-4fc6-b652-3443874118b8', jsonb_build_object('email','molly@books.com', 'name','Molly Member','pwhash',crypt('mollymember','87'),'role','shopper', 'address','74 Shipley Court
Saugus, MA 01906'));
INSERT INTO account(id, data) VALUES ('da981030-0de5-4152-aeaa-5379b0abfbf2', jsonb_build_object('email','anna@books.com','name','Anna Admin','pwhash',crypt('annaadmin','87'),'role','admin', 'address','Simons house'));
INSERT INTO account(id, data) VALUES ('33d646df-1f4a-4130-8590-720f45ba4179', jsonb_build_object('email','vivian@books.com','name','Vivian Vendor','pwhash',crypt('vivianvendor','87'),'role','vendor', 'address', '957 Green Lake St.
Ocean Springs, MS 39564'));