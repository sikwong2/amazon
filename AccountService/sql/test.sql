\c accountdatabase;
DELETE FROM account;
INSERT INTO account(id, data) VALUES ('81c689b1-b7a7-4100-8b2d-309908b444f5', jsonb_build_object('email','anna@books.com','name','Anna Admin','pwhash',crypt('annaadmin','87'),'role','admin'));