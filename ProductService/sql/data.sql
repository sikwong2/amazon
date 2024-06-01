DELETE FROM product;

-- empty product
-- INSERT INTO product(data) VALUES (jsonb_build_object('name', '', 'price', 0, 'stock', 0, 'rating', 0.0, 'image', ARRAY[''], 'description', ARRAY[''], 'category', ARRAY['']));

-- IDs are hardcoded for testing
INSERT INTO product(id, data) VALUES ('6a2212e5-af0b-4472-a724-537bdc6c571c', jsonb_build_object('name', 'Shrek DVD', 'price', 19.99, 'stock', 1, 'rating', 4.8, 'image', ARRAY['https://m.media-amazon.com/images/I/51JSHMYGTYL._AC_UF894,1000_QL80_.jpg'], 'description', ARRAY['Once upon a time in a far away swamp, there lived an ornery ogre named Shrek whose precious solitude is suddenly shattered by an invasion of annoying fairy-tale characters. There are blind mice in his food, a big, bad wolf in his bed, three little homeless pigs and more, all banished from their kingdom by the evil Lord Farquaad.'], 'category', ARRAY['movie', 'dvd', 'shrek']));
INSERT INTO product(id, data) VALUES ('20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8', jsonb_build_object('name', 'Shrek 2 DVD', 'price', 19.99, 'stock', 1, 'rating', 4.8, 'image', ARRAY['https://m.media-amazon.com/images/I/71HQiOZsZ6L._AC_UF1000,1000_QL80_.jpg', 'https://m.media-amazon.com/images/I/71GIXaa-bhL._SL1050_.jpg'], 'description', ARRAY['Lovable ogre Shrek has his marriage to a princess come under fire from her parents and a meddling fairy godmother in this sequel.'], 'category', ARRAY['dvd', 'movie', 'shrek']));
INSERT INTO product(id, data) VALUES ('fb31be70-f4f3-4ccc-b483-14e831dc61d1', jsonb_build_object('name', 'Shrek 3 DVD', 'price', 19.99, 'stock', 1, 'rating', 4.7, 'image', ARRAY['https://m.media-amazon.com/images/I/81uE-9vcOEL._AC_UF1000,1000_QL80_.jpg', 'https://m.media-amazon.com/images/I/81g1PEZNi6L._SY445_.jpg'], 'description', ARRAY['Get ready for Thirds - the greatest fairytale never told continues with a while new hilarious comedy of royal proportions. When his frog-in-law suddenly croaks, Shrek embarks on another whirlwind adventure with Donkey and Puss In Boots to find the rightful heir to the throne.'], 'category', ARRAY['shrek', 'dvd', 'movie']));
INSERT INTO product(id, data) VALUES ('e64edcc9-3262-49b8-bda4-066c34089e05', jsonb_build_object('name', 'Shrek Forever After DVD', 'price', 19.99, 'stock', 1, 'rating', 4.8, 'image', ARRAY['https://m.media-amazon.com/images/I/8148AAppyOL._AC_UF894,1000_QL80_.jpg', 'https://m.media-amazon.com/images/I/81ztdNcQmZL._SL1500_.jpg'], 'description', ARRAY['The further adventures of the giant green ogre, Shrek, living in the land of Far, Far Away'], 'category', ARRAY['movie', 'dvd', 'shrek']));

INSERT INTO product(id, data) VALUES ('fcdfc6a7-3e50-4909-818c-379f75b4320a', jsonb_build_object('name', 'Apple 2022 MacBook Air Laptop with M2 chip: 13.6-inch Liquid Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera. Works with iPhone and iPad; Midnight', 'price', 849, 'stock', 200, 'rating', 4.8, 'image', ARRAY['https://m.media-amazon.com/images/I/719C6bJv8jL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61XufEFo1dL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61HS4BY-4rL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81jcKZq-EOL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61GAbMHjeYL._AC_SL1500_.jpg'], 'description', ARRAY['STRIKINGLY THIN DESIGN — The redesigned MacBook Air is more portable than ever and weighs just 2.7 pounds. It’s the incredibly capable laptop that lets you work, play or create just about anything — anywhere.', 'SUPERCHARGED BY M2 — Get more done faster with a next-generation 8-core CPU, up to 10-core GPU and up to 24GB of unified memory.', 'UP TO 18 HOURS OF BATTERY LIFE — Go all day and into the night, thanks to the power-efficient performance of the Apple M2 chip.', 'BIG, BEAUTIFUL DISPLAY — The 13.6-inch Liquid Retina display features over 500 nits of brightness, P3 wide color and support for 1 billion colors for vibrant images and incredible detail.', 'ADVANCED CAMERA AND AUDIO — Look sharp and sound great with a 1080p FaceTime HD camera, three-mic array and four-speaker sound system with Spatial Audio.', 'VERSATILE CONNECTIVITY — MacBook Air features a MagSafe charging port, two Thunderbolt ports and a headphone jack.', 'EASY TO USE — Your Mac feels familiar from the moment you turn it on, and works seamlessly with all your Apple devices.'], 'category', ARRAY['electronics', 'sale', 'apple']));
INSERT INTO product(id, data) VALUES ('8e2b4bd2-e946-45c5-9796-d23baa2b0ae5', jsonb_build_object('name', 'Apple 2023 MacBook Pro Laptop M3 Max chip with 16-core CPU, 40-core GPU: 16.2-inch Liquid Retina XDR Display, 48GB Unified Memory, 1TB SSD Storage. Works with iPhone/iPad; Space Black', 'price', 3699, 'stock', 4, 'rating', 4.6, 'image', ARRAY['https://m.media-amazon.com/images/I/618d5bS2lUL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71qArNmCH8L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71Dr4KUCjgL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71b7B8OVHvL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/718n279cEAL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61tt5IdGE3L._AC_SL1500_.jpg'], 'description', ARRAY['SUPERCHARGED BY M3 PRO OR M3 MAX — The Apple M3 Pro chip, with a 12-core CPU and 18-core GPU, delivers amazing performance for demanding workflows like manipulating gigapixel panoramas or compiling millions of lines of code. M3 Max, with an up to 16-core CPU and up to 40-core GPU, drives extreme performance for the most advanced workflows like rendering intricate 3D content or developing transformer models with billions of parameters.', 'UP TO 22 HOURS OF BATTERY LIFE — Go all day thanks to the power-efficient design of Apple silicon. The MacBook Pro laptop delivers the same exceptional performance whether it’s running on battery or plugged in. (Battery life varies by use and configuration. See apple.com/batteries for more information.)', 'BRILLIANT PRO DISPLAY — The 16.2-inch Liquid Retina XDR display features Extreme Dynamic Range, over 1000 nits of brightness for stunning HDR content, up to 600 nits of brightness for SDR content, and pro reference modes for doing your best work on the go. (The display has rounded corners at the top. When measured diagonally, the screen is 16.2 inches. Actual viewable area is less.)', 'FULLY COMPATIBLE — All your pro apps run lightning fast — including Adobe Creative Cloud, Apple Xcode, Microsoft 365, SideFX Houdini, MathWorks MATLAB, Medivis SurgicalAR, and many of your favorite iPhone and iPad apps. And with macOS, work and play on your Mac are even more powerful. Elevate your presence on video calls. Access information in all-new ways. And discover even more ways to personalize your Mac. (Apps are available on the App Store.)', 'ADVANCED CAMERA AND AUDIO — Look sharp and sound great with a 1080p FaceTime HD camera, a studio-quality three-mic array, and a six-speaker sound system with Spatial Audio.', 'CONNECT IT ALL — This MacBook Pro features a MagSafe charging port, three Thunderbolt 4 ports, an SDXC card slot, an HDMI port, and a headphone jack. Enjoy fast wireless connectivity with Wi-Fi 6E and Bluetooth 5.3. And you can connect up to two external displays with M3 Pro, or up to four with M3 Max. (Wi‑Fi 6E available in countries and regions where supported.)', 'MAGIC KEYBOARD WITH TOUCH ID — The backlit Magic Keyboard has a full-height function key row and Touch ID, which gives you a fast, easy, secure way to unlock your laptop and sign in to apps and sites.'], 'category', ARRAY['apple', 'sale', 'electronics']));
INSERT INTO product(id, data) VALUES ('88db3140-54d2-4f1f-a552-7454bf55dcaf', jsonb_build_object('name', 'Apple 2024 MacBook Air 13-inch Laptop with M3 chip: 13.6-inch Liquid Retina Display, 8GB Unified Memory, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera, Touch ID; Space Gray', 'price', 999, 'stock', 100, 'rating', 4.5, 'image', ARRAY['https://m.media-amazon.com/images/I/71ItMeqpN3L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/617cNLYnypL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61S2t5yhVSL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71njQte16FL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/612Tf3UgLbL._AC_SL1500_.jpg'], 'description', ARRAY['LEAN. MEAN. M3 MACHINE — The blazing-fast MacBook Air with the M3 chip is a superportable laptop that sails through work and play.', 'PORTABLE DESIGN — Lightweight and under half an inch thin, so you can take MacBook Air anywhere you go.', 'GET MORE DONE FASTER — The powerful 8-core CPU and up to 10-core GPU of the Apple M3 chip keep things running smoothly.', 'UP TO 18 HOURS OF BATTERY LIFE — Amazing, all-day battery life so you can leave the power adapter at home.', 'A BRILLIANT DISPLAY — The 13.6-inch Liquid Retina display supports 1 billion colors.', 'LOOK SHARP, SOUND GREAT — Everything looks and sounds amazing with a 1080p FaceTime HD camera, three mics, and four speakers with Spatial Audio.', 'APPS FLY WITH APPLE SILICON — All your favorites, from Microsoft 365 to Adobe Creative Cloud, run lightning fast in macOS.'], 'category', ARRAY['apple', 'sale', 'electronics']));

INSERT INTO product(id, data) VALUES ('86b0b448-fa22-4235-a88f-211e7619d44b', jsonb_build_object('name', 'WILSON NCAA Street Shot Basketballs - 29.5"', 'price', 14.97, 'stock', 30, 'rating', 4.5, 'image', ARRAY['https://m.media-amazon.com/images/I/81w-4+yz6FL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81pmzL1XF0L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81XmaN3BpbL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81ee2sB0DpL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/8155Z80xGsL._AC_SL1500_.jpg'], 'description', ARRAY['OFFICIAL SIZE: This 29.5" basketball is ideal for boys age 14 and up.', 'EXTENDED DURABLITY: An interal pressure-lock bladder improves long-term durability and air rentention to keep the ball inflated.', 'ALL-COURT PERFORMANCE: A durable rubber cover makes this ball suitable for indoor and outdoor play.', 'ULTIMATE GRIP: Wilson’s signature Total Grip Technology provides enhanced softness and grip so more players can palm the ball', 'ENHANCED CONTROL: Deeper channels between the panels of the ball allow for more grip points and better ball control when dribbling and shooting.'],'category', ARRAY['sports', 'sale', 'basketball']));
INSERT INTO product(id, data) VALUES ('c5f199c9-0799-43ad-848b-f7e8e76ee0e4', jsonb_build_object('name', 'WILSON Evolution Indoor Game Basketballs', 'price', 79.95, 'stock', 24, 'rating', 4.8, 'image', ARRAY['https://m.media-amazon.com/images/I/91vdgs5FY4L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/91p-l345+FL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81joPWcgkdL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/918SMQ6MkhL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71FqoE-kMjL._AC_SL1200_.jpg'], 'description', ARRAY['When you focus on getting better, and not just on getting results, success takes care of itself. That is why the Wilson Evolution Game Ball is the preferred basketball in high schools across the country.', 'Signature EVO feel: the soft feel that the evolution basketball is famous for is due it’s cushion core carcass, making the ball softer to the touch and easier to grip around the rim', 'Grip & durability: the premium Evo microfiber composite cover provides a grip that players love and durability to last all-season and beyond', 'Ultimate control: laid-in composite channels create a consistent feel and texture over the entire surface of the basketball to provide unparalleled control', 'NFHS approved: approved for play by the national federation of state high school associations (NFHS)', 'Official size basketball: 29.5"', 'Proper inflation level: 7-9 psi'],'category', ARRAY['basketball', 'sale', 'sports']));
INSERT INTO product(id, data) VALUES ('c85ddd6d-c3ef-4ba2-8951-a6f377c4fe94', jsonb_build_object('name', 'Spalding React TF-250 Indoor-Outdoor Basketball', 'price', 41.80, 'stock', 11, 'rating', 4.5, 'image', ARRAY['https://m.media-amazon.com/images/I/91r8TF05ItL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/91KjvH4aX6L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/91RmCmc4mBL._AC_SL1500_.jpg'], 'description', ARRAY['Official size and weight: Size 7, 29.5"', 'All-surface composite leather cover', 'Butyl rubber bladder for air retention', 'Shipped inflated and game-ready', 'Designed for indoor and outdoor play'],'category', ARRAY['Spalding', 'basketball', 'sale', 'sports']));
INSERT INTO product(id, data) VALUES ('443c7147-9747-4f94-bc49-4dda3b7bfc59', jsonb_build_object('name', 'Molten B7G3800', 'price', 43.15, 'stock', 77, 'rating', 4.5, 'image', ARRAY['https://m.media-amazon.com/images/I/91v6Jz3OteL._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/81sENfcL38L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/919oJhh2-QL._AC_SL1500_.jpg'], 'description', ARRAY['FIBA Approved', 'Official 12 panel, 2-tone design', 'Indoor/Outdoor synthetic cover', 'Butyl Bladder'],'category', ARRAY['Molten', 'basketball', 'sports', 'sale']));

INSERT INTO product(id, data) VALUES ('fcab207a-fd48-4e81-a15d-a754f49fcd15', jsonb_build_object('name', 'PESRAE Floor Lamp, Remote Control with 4 Color Temperatures, Torchiere Floor lamp for Bedroom, Standing Lamps for Living Room, Bulb Included (Glossy Black)', 'price', 43.99, 'stock', 500, 'rating', 4.6, 'image', ARRAY['https://m.media-amazon.com/images/I/51zuboQ4c2L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81n+YGlN8uS._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61pAWjfWIdS._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71YUbvFOtiL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71ndCFYTunS._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/711GkYlDRhL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81QO2hB-0NL._AC_SL1500_.jpg'], 'description', ARRAY['9W LED dimmable remote-control bulb included; Floor lamp with 9W dimmer remote control led bulb that can be remotely controlled within 49ft', 'Stepless brightness and optional color temperature; use the remote control to adjust the brightness by stepless from 5% to 100% and color temperature from 3000k to 6000k, replaceable bulb design, which means you can choose different lights to match different scene you need', 'Multiple switching modes; This floor lamps comes with remote control and foot switch, The combination of traditional foot switch and remote control makes the tall lamps more convenient and fit for living room, bedrooms, The remote control is magnetic so you can attach it to the to a lamp or any metal surface to prevent losing it.', 'Easy to assembly; It is easy to Install, No extra tools are required, you only need to screw all the parts of the pole together to complete the assembly of this torchiere floor lamp, assembly has never been easier', 'Space-saving corner lamp; Standing lamp great for reading room and living room, the sky torchiere floor lamp easily fits beside the couch or in the corner'], 'category', ARRAY['lamp', 'sale', 'furniture', 'home']));
INSERT INTO product(id, data) VALUES ('460ee6d3-e911-4b39-87f8-d342831f2b28', jsonb_build_object('name', 'luckystyle Floor Lamp,Super Bright Dimmable LED Lamps for Living Room, Custom Color Temperature Standing Lamp with Remote Push Button, Adjustable Gooseneck Reading Floor Lamp for Bedroom Office Black', 'price', 33.99, 'stock', 400, 'rating', 33.99, 'image', ARRAY['https://m.media-amazon.com/images/I/61tKBisT-fL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71vu9HQ7WpL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61lHE0UiJ+L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61ai7mJm0oL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71dhdGHpP1L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61skUFU5uqL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71OtmralpVL._AC_SL1500_.jpg'], 'description', ARRAY['Upgraded Base and Lamp Head: The newly upgraded tall lamps for living room has a metal base that is heavy enough to keep it firmly placed. And it is balanced on a low pile carpet or hard floor without feeling top-heavy. With a higher quality lamp head, no flashing and blue light. Protect the eyes of you and your family. The office floor lamp are specially designed to provide bright, non-dazzling lighting.', '2 Types Control: 50ft distance remote control precisely control the LED floor reading lamps even if there are obstacles. Sensitive button control. Due to the intelligent inner build-in components of the reading light floor lamp. The magnetic remote attracts iron firmly and won’t drop. Handy to be used.', 'Versatile and Dimmable Lights: 5%-100% stepless dimmable brightness, 4 colors temperatures(3000K-6500K), you can customize your favorable lights of floor lamps for bedrooms. Click button to change the color(white, cold white, warm white, warm), craft lighting floor lamp could help you to deal with the dark, gloomy in your room.', 'Timer Setting: The living room lamp has a timing function of 30 minutes and one hour, you can set the time to turn on or off according to your needs.', 'Long Lifespan and Energy Saving: An adjustable gooseneck that allows you to rotate the flexible floor pole lamp head to any direction and angle, fixed to any position you like. The gooseneck tube is strong enough to hold it in position so it doesn’t flip or droop around when you try to adjust it. The light life of up to 100,000 hours, can reduce the cost of maintenance and replacement, completely save money and energy.'], 'category', ARRAY['furniture', 'sale', 'lamp', 'home']));
INSERT INTO product(id, data) VALUES ('3f97fbe9-b883-463c-83cd-3d9e536a1d42', jsonb_build_object('name', 'Standing Lamp, Led Floor Lamp with 3 Levels Dimmable Brightness, Drop-Resistant White Lampshade, Rotary Switch, Industrial Metal Floor Lamp for Living Room Bedroom Study Office Kid’s Room', 'price', 17.99, 'stock', 300, 'rating', 4.3, 'image', ARRAY['https://m.media-amazon.com/images/I/51sZ7VI6iTL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71ERyrroAJL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61YSjKfT1cL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/619PNJZ+5bL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71lauGialiL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71dAavusJ7L._AC_SL1500_.jpg'], 'description', ARRAY['Stylish Minimalist Design: This Floor lamp can easily be placed behind a sofa or next to a cabinet for easy space saving. In addition, the simple and modern design makes it not only a floor lamp for bedroom, living room, office or classroom, but also a perfect choice for home decoration. The standing lamp fits well with urban, mid-century modern, casual, or contemporary decor.', '3-Level Adjustable Brightness: This LED floor lamp features three brightness settings with a unique dimming sequence: Low-Off-Medium-Off-High-Off. This versatility makes it suitable for various activities such as reading, working, or everyday use. Each lighting mode offers gentle, eye-soothing illumination that is both functional and aesthetically pleasing.', 'E26 Bulbs Compatible: Equipped with an E26 socket, this tall lamp boasts excellent heat dissipation, ensuring a longer lifespan. It is compatible with various types of 3-level dimmable bulbs, although it is recommended to use three-way incandescent bulbs for optimal performance. (Note: 3-level dimming bulb not included, maximum 100W)', 'Safe & Easy Assembly: Simple and easy to assemble without extra tools, you just need to screw all the parts of the modern floor lamp working together by following the instruction. The bottom of the corner lamp adopts a weighted and stable design to prevent tipping and can be used near the elderly, children and pets; the lampshade is also made of resin plastic, which avoids the risk of breakage of the traditional glass lampshade.', 'Ideal Gifts for Decorative: This floor lamps for living room is a perfect holiday gift and birthday gift for mothers, fathers, wives, husbands, children, and friends. The Black Floor Lamp is also suitable for living room, bedroom, reading room, office, library, kitchen, coffee shop, hotel, restaurant, etc.'], 'category', ARRAY['home', 'sale', 'furniture', 'lamp']));
