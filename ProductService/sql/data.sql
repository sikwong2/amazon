DELETE FROM product;

-- IDs are hardcoded for testing
-- single quote: ’
-- empty product
  -- INSERT INTO product(data) VALUES (jsonb_build_object(
  --   'name', '', 
  --   'price', 0, 'stock', 0, 'rating', 0.0, 
  --   'image', ARRAY[''], 
  --   'description', ARRAY[''], 
  --   'category', ARRAY['']
  -- ));

-- PRODUCTS TABLE
  -- Shrek DVDs
  INSERT INTO product(id, data) VALUES ('6a2212e5-af0b-4472-a724-537bdc6c571c', jsonb_build_object(
    'name', 'Shrek DVD', 'price', 19.99, 'stock', 1, 'rating', 4.8, 
    'image', ARRAY['https://m.media-amazon.com/images/I/51JSHMYGTYL._AC_UF894,1000_QL80_.jpg'], 
    'description', ARRAY['Once upon a time in a far away swamp, there lived an ornery ogre named Shrek whose precious solitude is suddenly shattered by an invasion of annoying fairy-tale characters. There are blind mice in his food, a big, bad wolf in his bed, three little homeless pigs and more, all banished from their kingdom by the evil Lord Farquaad.'], 
    'category', ARRAY['movie', 'dvd', 'shrek', 'Movies, Music & Games']
  ));
  INSERT INTO product(id, data) VALUES ('20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8', jsonb_build_object(
    'name', 'Shrek 2 DVD', 'price', 19.99, 'stock', 1, 'rating', 4.8, 
    'image', ARRAY['https://m.media-amazon.com/images/I/71HQiOZsZ6L._AC_UF1000,1000_QL80_.jpg', 'https://m.media-amazon.com/images/I/71GIXaa-bhL._SL1050_.jpg'], 
    'description', ARRAY['Lovable ogre Shrek has his marriage to a princess come under fire from her parents and a meddling fairy godmother in this sequel.'], 
    'category', ARRAY['dvd', 'movie', 'shrek', 'Movies, Music & Games']
  ));
  INSERT INTO product(id, data) VALUES ('fb31be70-f4f3-4ccc-b483-14e831dc61d1', jsonb_build_object(
    'name', 'Shrek 3 DVD',
    'price', 19.99, 'stock', 1, 'rating', 4.7, 
    'image', ARRAY['https://m.media-amazon.com/images/I/81uE-9vcOEL._AC_UF1000,1000_QL80_.jpg', 'https://m.media-amazon.com/images/I/81g1PEZNi6L._SY445_.jpg'], 
    'description', ARRAY['Get ready for Thirds - the greatest fairytale never told continues with a while new hilarious comedy of royal proportions. When his frog-in-law suddenly croaks, Shrek embarks on another whirlwind adventure with Donkey and Puss In Boots to find the rightful heir to the throne.'], 
    'category', ARRAY['shrek', 'dvd', 'movie', 'Movies, Music & Games']
  ));
  INSERT INTO product(id, data) VALUES ('e64edcc9-3262-49b8-bda4-066c34089e05', jsonb_build_object(
    'name', 'Shrek Forever After DVD', 'price', 19.99, 'stock', 1, 'rating', 4.8, 
    'image', ARRAY['https://m.media-amazon.com/images/I/8148AAppyOL._AC_UF894,1000_QL80_.jpg', 'https://m.media-amazon.com/images/I/81ztdNcQmZL._SL1500_.jpg'], 
    'description', ARRAY['The further adventures of the giant green ogre, Shrek, living in the land of Far, Far Away'], 
    'category', ARRAY['movie', 'dvd', 'shrek', 'Movies, Music & Games']
  ));

  -- Macbooks
  INSERT INTO product(id, data) VALUES ('fcdfc6a7-3e50-4909-818c-379f75b4320a', jsonb_build_object(
    'name', 'Apple 2022 MacBook Air Laptop with M2 chip: 13.6-inch Liquid Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera. Works with iPhone and iPad; Midnight', 
    'price', 849, 'stock', 200, 'rating', 4.8, 
    'image', ARRAY['https://m.media-amazon.com/images/I/719C6bJv8jL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61XufEFo1dL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61HS4BY-4rL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81jcKZq-EOL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61GAbMHjeYL._AC_SL1500_.jpg'], 
    'description', ARRAY['STRIKINGLY THIN DESIGN — The redesigned MacBook Air is more portable than ever and weighs just 2.7 pounds. It’s the incredibly capable laptop that lets you work, play or create just about anything — anywhere.', 'SUPERCHARGED BY M2 — Get more done faster with a next-generation 8-core CPU, up to 10-core GPU and up to 24GB of unified memory.', 'UP TO 18 HOURS OF BATTERY LIFE — Go all day and into the night, thanks to the power-efficient performance of the Apple M2 chip.', 'BIG, BEAUTIFUL DISPLAY — The 13.6-inch Liquid Retina display features over 500 nits of brightness, P3 wide color and support for 1 billion colors for vibrant images and incredible detail.', 'ADVANCED CAMERA AND AUDIO — Look sharp and sound great with a 1080p FaceTime HD camera, three-mic array and four-speaker sound system with Spatial Audio.', 'VERSATILE CONNECTIVITY — MacBook Air features a MagSafe charging port, two Thunderbolt ports and a headphone jack.', 'EASY TO USE — Your Mac feels familiar from the moment you turn it on, and works seamlessly with all your Apple devices.'], 
    'category', ARRAY['Electronics', 'sale', 'apple', 'Computers']
  ));
  INSERT INTO product(id, data) VALUES ('8e2b4bd2-e946-45c5-9796-d23baa2b0ae5', jsonb_build_object(
    'name', 'Apple 2023 MacBook Pro Laptop M3 Max chip with 16-core CPU, 40-core GPU: 16.2-inch Liquid Retina XDR Display, 48GB Unified Memory, 1TB SSD Storage. Works with iPhone/iPad; Space Black', 
    'price', 3699, 'stock', 4, 'rating', 4.6, 
    'image', ARRAY['https://m.media-amazon.com/images/I/618d5bS2lUL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71qArNmCH8L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71Dr4KUCjgL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71b7B8OVHvL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/718n279cEAL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61tt5IdGE3L._AC_SL1500_.jpg'], 
    'description', ARRAY['SUPERCHARGED BY M3 PRO OR M3 MAX — The Apple M3 Pro chip, with a 12-core CPU and 18-core GPU, delivers amazing performance for demanding workflows like manipulating gigapixel panoramas or compiling millions of lines of code. M3 Max, with an up to 16-core CPU and up to 40-core GPU, drives extreme performance for the most advanced workflows like rendering intricate 3D content or developing transformer models with billions of parameters.', 'UP TO 22 HOURS OF BATTERY LIFE — Go all day thanks to the power-efficient design of Apple silicon. The MacBook Pro laptop delivers the same exceptional performance whether it’s running on battery or plugged in. (Battery life varies by use and configuration. See apple.com/batteries for more information.)', 'BRILLIANT PRO DISPLAY — The 16.2-inch Liquid Retina XDR display features Extreme Dynamic Range, over 1000 nits of brightness for stunning HDR content, up to 600 nits of brightness for SDR content, and pro reference modes for doing your best work on the go. (The display has rounded corners at the top. When measured diagonally, the screen is 16.2 inches. Actual viewable area is less.)', 'FULLY COMPATIBLE — All your pro apps run lightning fast — including Adobe Creative Cloud, Apple Xcode, Microsoft 365, SideFX Houdini, MathWorks MATLAB, Medivis SurgicalAR, and many of your favorite iPhone and iPad apps. And with macOS, work and play on your Mac are even more powerful. Elevate your presence on video calls. Access information in all-new ways. And discover even more ways to personalize your Mac. (Apps are available on the App Store.)', 'ADVANCED CAMERA AND AUDIO — Look sharp and sound great with a 1080p FaceTime HD camera, a studio-quality three-mic array, and a six-speaker sound system with Spatial Audio.', 'CONNECT IT ALL — This MacBook Pro features a MagSafe charging port, three Thunderbolt 4 ports, an SDXC card slot, an HDMI port, and a headphone jack. Enjoy fast wireless connectivity with Wi-Fi 6E and Bluetooth 5.3. And you can connect up to two external displays with M3 Pro, or up to four with M3 Max. (Wi‑Fi 6E available in countries and regions where supported.)', 'MAGIC KEYBOARD WITH TOUCH ID — The backlit Magic Keyboard has a full-height function key row and Touch ID, which gives you a fast, easy, secure way to unlock your laptop and sign in to apps and sites.'], 
    'category', ARRAY['apple', 'sale', 'Electronics', 'Computers']
  ));
  INSERT INTO product(id, data) VALUES ('88db3140-54d2-4f1f-a552-7454bf55dcaf', jsonb_build_object(
    'name', 'Apple 2024 MacBook Air 13-inch Laptop with M3 chip: 13.6-inch Liquid Retina Display, 8GB Unified Memory, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera, Touch ID; Space Gray',
    'price', 999, 'stock', 100, 'rating', 4.5, 
    'image', ARRAY['https://m.media-amazon.com/images/I/71ItMeqpN3L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/617cNLYnypL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61S2t5yhVSL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71njQte16FL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/612Tf3UgLbL._AC_SL1500_.jpg'], 
    'description', ARRAY['LEAN. MEAN. M3 MACHINE — The blazing-fast MacBook Air with the M3 chip is a superportable laptop that sails through work and play.', 'PORTABLE DESIGN — Lightweight and under half an inch thin, so you can take MacBook Air anywhere you go.', 'GET MORE DONE FASTER — The powerful 8-core CPU and up to 10-core GPU of the Apple M3 chip keep things running smoothly.', 'UP TO 18 HOURS OF BATTERY LIFE — Amazing, all-day battery life so you can leave the power adapter at home.', 'A BRILLIANT DISPLAY — The 13.6-inch Liquid Retina display supports 1 billion colors.', 'LOOK SHARP, SOUND GREAT — Everything looks and sounds amazing with a 1080p FaceTime HD camera, three mics, and four speakers with Spatial Audio.', 'APPS FLY WITH APPLE SILICON — All your favorites, from Microsoft 365 to Adobe Creative Cloud, run lightning fast in macOS.'], 
    'category', ARRAY['apple', 'sale', 'Electronics', 'Computers']
  ));

  -- Apple
  INSERT INTO product(id, data) VALUES ('090bafa5-dcf1-47c4-9b06-e76280aa75c0', jsonb_build_object(
    'name', 'Apple AirTag 4 Pack', 'price', 78.99, 'stock', 1000, 'rating', 4.8, 
    'image', ARRAY['https://f.media-amazon.com/images/I/71gY9E+cTaS._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71JJueCRWJS._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/91bsFWILPGS._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/81Lq1AfCYpS._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71ZMyXWM9CS._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71YziLCAJSS._AC_SL1500_.jpg'], 
    'description', ARRAY['Keep track of and find your items alongside friends and devices in the Find My app', 'Simple one-tap setup instantly connects AirTag with your iPhone or iPad', 'Play a sound on the built-in speaker to help find your things, or just ask Siri for help', 'Precision Finding with Ultra Wideband technology leads you right to your nearby AirTag on select iPhone models', 'Find items further away with the help of hundreds of millions of Apple devices in the Find My network', 'Put AirTag into Lost Mode to be automatically notified when it’s detected in the Find My network', 'All communication with the Find My network is anonymous and encrypted for privacy, Location data and history are never stored on AirTag', 'Replaceable battery lasts over a year', 'AirTag is IP67 water and dust resistant', 'Make AirTag yours with a range of colorful accessories, sold separately'], 
    'category', ARRAY['AirTags', 'apple', 'sale', 'Electronics', 'Pet Supplies', 'Smart Home']
  ));
  INSERT INTO product(id, data) VALUES ('caeb49c7-69bc-4ed9-ab3e-8cef39ed6c1d', jsonb_build_object(
    'name', 'Apple AirPods (2nd Generation) Wireless Ear Buds, Bluetooth Headphones with Lightning Charging Case Included, Over 24 Hours of Battery Life, Effortless Setup for iPhone', 
    'price', 89.00, 'stock', 1000, 'rating', 4.7, 
    'image', ARRAY['https://f.media-amazon.com/images/I/7120GgUKj3L._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71NLN1HgFkL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71NTi82uBEL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71QT9PrfxyL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/41aaZ7P-48L._AC_SL1000_.jpg', 'https://f.media-amazon.com/images/I/71djnhmfy-L._AC_SL1500_.jpg'], 
    'description', ARRAY['HIGH-QUALITY SOUND — Powered by the Apple H1 headphone chip, AirPods (2nd generation) deliver rich, vivid sound.', 'EFFORTLESS SETUP — After a simple one-tap setup, AirPods are automatically on and always connected. They sense when they’re in your ears and pause when you take them out. And sound seamlessly switches between your iPhone, Apple Watch, Mac, iPad, and Apple TV.', 'VOICE CONTROL WITH SIRI — Just say “Hey Siri” for assistance without having to reach for your iPhone.', '24-HOUR BATTERY LIFE — More than 24 hours total listening time with the Charging Case.', 'AUDIO SHARING — Easily share audio between two sets of AirPods on your iPhone, iPad, iPod touch, or Apple TV.', 'LEGAL DISCLAIMERS — This is a summary of the main product features. See “Additional information” to learn more.'], 
    'category', ARRAY['Airpods by Apple', 'apple', 'sale', 'Electronics', 'airpods']
  ));
  INSERT INTO product(id, data) VALUES ('c49680cd-f184-4cee-a584-d9be7ddaf039', jsonb_build_object(
    'name', 'Apple AirPods Max Wireless Over-Ear Headphones, Active Noise Cancelling, Transparency Mode, Personalized Audio, Dolby Atmos, Bluetooth Headphones for iPhone Gray', 
    'price', 524.00, 'stock', 5, 'rating', 4.6, 
    'image', ARRAY['https://f.media-amazon.com/images/I/81jqUPkIVRL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/81S533RgkwL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71aAV-Vhg8L._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/712Jl7+DA4L._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/91lPKrrfwYS._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71urS8imiUL._AC_SL1500_.jpg'], 
    'description', ARRAY['BREATHTAKING AUDIO QUALITY — Apple-designed dynamic driver provides high-fidelity audio. Computational audio combines custom acoustic design with the Apple H1 chip and software for breakthrough listening experiences.', 'FOCUS ON WHAT’S PLAYING — Active Noise Cancellation blocks outside noise so you can immerse yourself in music.', 'HEAR THE WORLD AROUND YOU — Transparency mode lets you hear and interact with the world around you.', 'PERSONALIZED SPATIAL AUDIO — With sound that suits your unique ear shape along with dynamic head tracking, AirPods Max deliver an immersive listening experience that places sound all around you. You can also listen to select songs, shows, and movies in Dolby Atmos.', 'ACOUSTIC-FIRST DESIGN — Designed with a knit-mesh canopy and memory foam ear cushions for an exceptional over-ear fit that perfectly seals in sound.', 'MAGICAL EXPERIENCE — Pair AirPods Max by simply placing them near your device and tapping Connect on your screen. AirPods Max pause audio when you take them off. And Automatic Switching makes listening between your iPhone, iPad, and Mac completely effortless.', 'LONG BATTERY LIFE — Up to 20 hours of listening, movie watching, or talk time with Active Noise Cancellation and Personalized Spatial Audio enabled.', 'PRECISION CONTROL — Use the Digital Crown to play and pause music, to answer, end, and mute yourself on calls, and to control volume and skip between tracks.', 'A SMARTER CASE — Store in an ultra low-power state with the slim Smart Case.', 'LEGAL DISCLAIMERS — This is a summary of the main product features. See “Additional information” to learn more.'], 
    'category', ARRAY['Headphones by Apple', 'Electronics', 'headphone', 'apple', 'airpods']
  ));

  -- Basketballs
  INSERT INTO product(id, data) VALUES ('86b0b448-fa22-4235-a88f-211e7619d44b', jsonb_build_object(
    'name', 'WILSON NCAA Street Shot Basketballs - 29.5"', 'price', 14.97, 'stock', 30, 'rating', 4.5, 
    'image', ARRAY['https://m.media-amazon.com/images/I/81w-4+yz6FL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81pmzL1XF0L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81XmaN3BpbL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81ee2sB0DpL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/8155Z80xGsL._AC_SL1500_.jpg'], 
    'description', ARRAY['OFFICIAL SIZE: This 29.5" basketball is ideal for boys age 14 and up.', 'EXTENDED DURABLITY: An interal pressure-lock bladder improves long-term durability and air rentention to keep the ball inflated.', 'ALL-COURT PERFORMANCE: A durable rubber cover makes this ball suitable for indoor and outdoor play.', 'ULTIMATE GRIP: Wilson’s signature Total Grip Technology provides enhanced softness and grip so more players can palm the ball', 'ENHANCED CONTROL: Deeper channels between the panels of the ball allow for more grip points and better ball control when dribbling and shooting.'],
    'category', ARRAY['sports', 'sale', 'basketball', 'Sports & Outdoors']
  ));
  INSERT INTO product(id, data) VALUES ('c5f199c9-0799-43ad-848b-f7e8e76ee0e4', jsonb_build_object(
    'name', 'WILSON Evolution Indoor Game Basketballs', 'price', 79.95, 'stock', 24, 'rating', 4.8, 
    'image', ARRAY['https://m.media-amazon.com/images/I/91vdgs5FY4L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/91p-l345+FL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81joPWcgkdL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/918SMQ6MkhL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71FqoE-kMjL._AC_SL1200_.jpg'], 
    'description', ARRAY['When you focus on getting better, and not just on getting results, success takes care of itself. That is why the Wilson Evolution Game Ball is the preferred basketball in high schools across the country.', 'Signature EVO feel: the soft feel that the evolution basketball is famous for is due it’s cushion core carcass, making the ball softer to the touch and easier to grip around the rim', 'Grip & durability: the premium Evo microfiber composite cover provides a grip that players love and durability to last all-season and beyond', 'Ultimate control: laid-in composite channels create a consistent feel and texture over the entire surface of the basketball to provide unparalleled control', 'NFHS approved: approved for play by the national federation of state high school associations (NFHS)', 'Official size basketball: 29.5"', 'Proper inflation level: 7-9 psi'],
    'category', ARRAY['basketball', 'sale', 'sports', 'Sports & Outdoors']
  ));
  INSERT INTO product(id, data) VALUES ('c85ddd6d-c3ef-4ba2-8951-a6f377c4fe94', jsonb_build_object(
    'name', 'Spalding React TF-250 Indoor-Outdoor Basketball', 'price', 41.80, 'stock', 11, 'rating', 4.5, 
    'image', ARRAY['https://m.media-amazon.com/images/I/91r8TF05ItL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/91KjvH4aX6L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/91RmCmc4mBL._AC_SL1500_.jpg'], 
    'description', ARRAY['Official size and weight: Size 7, 29.5"', 'All-surface composite leather cover', 'Butyl rubber bladder for air retention', 'Shipped inflated and game-ready', 'Designed for indoor and outdoor play'],
    'category', ARRAY['Spalding', 'basketball', 'sale', 'sports', 'Sports & Outdoors']
  ));
  INSERT INTO product(id, data) VALUES ('443c7147-9747-4f94-bc49-4dda3b7bfc59', jsonb_build_object(
    'name', 'Molten B7G3800', 'price', 43.15, 'stock', 77, 'rating', 4.5, 
    'image', ARRAY['https://m.media-amazon.com/images/I/91v6Jz3OteL._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/81sENfcL38L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/919oJhh2-QL._AC_SL1500_.jpg'], 
    'description', ARRAY['FIBA Approved', 'Official 12 panel, 2-tone design', 'Indoor/Outdoor synthetic cover', 'Butyl Bladder'],
    'category', ARRAY['Molten', 'basketball', 'sports', 'sale', 'Sports & Outdoors']
  ));

  -- Lamps
  INSERT INTO product(id, data) VALUES ('fcab207a-fd48-4e81-a15d-a754f49fcd15', jsonb_build_object(
    'name', 'PESRAE Floor Lamp, Remote Control with 4 Color Temperatures, Torchiere Floor lamp for Bedroom, Standing Lamps for Living Room, Bulb Included (Glossy Black)', 'price', 43.99, 'stock', 500, 'rating', 4.6, 
    'image', ARRAY['https://m.media-amazon.com/images/I/51zuboQ4c2L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81n+YGlN8uS._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61pAWjfWIdS._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71YUbvFOtiL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71ndCFYTunS._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/711GkYlDRhL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81QO2hB-0NL._AC_SL1500_.jpg'], 
    'description', ARRAY['9W LED dimmable remote-control bulb included; Floor lamp with 9W dimmer remote control led bulb that can be remotely controlled within 49ft', 'Stepless brightness and optional color temperature; use the remote control to adjust the brightness by stepless from 5% to 100% and color temperature from 3000k to 6000k, replaceable bulb design, which means you can choose different lights to match different scene you need', 'Multiple switching modes; This floor lamps comes with remote control and foot switch, The combination of traditional foot switch and remote control makes the tall lamps more convenient and fit for living room, bedrooms, The remote control is magnetic so you can attach it to the to a lamp or any metal surface to prevent losing it.', 'Easy to assembly; It is easy to Install, No extra tools are required, you only need to screw all the parts of the pole together to complete the assembly of this torchiere floor lamp, assembly has never been easier', 'Space-saving corner lamp; Standing lamp great for reading room and living room, the sky torchiere floor lamp easily fits beside the couch or in the corner'], 
    'category', ARRAY['lamp', 'sale', 'furniture', 'Home, Garden & Tools', 'Home, Garden & Tools']
  ));
  INSERT INTO product(id, data) VALUES ('460ee6d3-e911-4b39-87f8-d342831f2b28', jsonb_build_object(
    'name', 'luckystyle Floor Lamp,Super Bright Dimmable LED Lamps for Living Room, Custom Color Temperature Standing Lamp with Remote Push Button, Adjustable Gooseneck Reading Floor Lamp for Bedroom Office Black', 'price', 33.99, 'stock', 400, 'rating', 4.6, 
    'image', ARRAY['https://m.media-amazon.com/images/I/61tKBisT-fL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71vu9HQ7WpL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61lHE0UiJ+L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61ai7mJm0oL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71dhdGHpP1L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61skUFU5uqL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71OtmralpVL._AC_SL1500_.jpg'], 
    'description', ARRAY['Upgraded Base and Lamp Head: The newly upgraded tall lamps for living room has a metal base that is heavy enough to keep it firmly placed. And it is balanced on a low pile carpet or hard floor without feeling top-heavy. With a higher quality lamp head, no flashing and blue light. Protect the eyes of you and your family. The office floor lamp are specially designed to provide bright, non-dazzling lighting.', '2 Types Control: 50ft distance remote control precisely control the LED floor reading lamps even if there are obstacles. Sensitive button control. Due to the intelligent inner build-in components of the reading light floor lamp. The magnetic remote attracts iron firmly and won’t drop. Handy to be used.', 'Versatile and Dimmable Lights: 5%-100% stepless dimmable brightness, 4 colors temperatures(3000K-6500K), you can customize your favorable lights of floor lamps for bedrooms. Click button to change the color white, cold white, warm white, warm, craft lighting floor lamp could help you to deal with the dark, gloomy in your room.', 'Timer Setting: The living room lamp has a timing function of 30 minutes and one hour, you can set the time to turn on or off according to your needs.', 'Long Lifespan and Energy Saving: An adjustable gooseneck that allows you to rotate the flexible floor pole lamp head to any direction and angle, fixed to any position you like. The gooseneck tube is strong enough to hold it in position so it doesn’t flip or droop around when you try to adjust it. The light life of up to 100,000 hours, can reduce the cost of maintenance and replacement, completely save money and energy.'], 
    'category', ARRAY['furniture', 'sale', 'lamp', 'Home, Garden & Tools', 'Home, Garden & Tools']
  ));
  INSERT INTO product(id, data) VALUES ('3f97fbe9-b883-463c-83cd-3d9e536a1d42', jsonb_build_object(
    'name', 'Standing Lamp, Led Floor Lamp with 3 Levels Dimmable Brightness, Drop-Resistant White Lampshade, Rotary Switch, Industrial Metal Floor Lamp for Living Room Bedroom Study Office Kid’s Room', 'price', 17.99, 'stock', 300, 'rating', 4.3, 
    'image', ARRAY['https://m.media-amazon.com/images/I/51sZ7VI6iTL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71ERyrroAJL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61YSjKfT1cL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/619PNJZ+5bL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71lauGialiL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71dAavusJ7L._AC_SL1500_.jpg'], 
    'description', ARRAY['Stylish Minimalist Design: This Floor lamp can easily be placed behind a sofa or next to a cabinet for easy space saving. In addition, the simple and modern design makes it not only a floor lamp for bedroom, living room, office or classroom, but also a perfect choice for home decoration. The standing lamp fits well with urban, mid-century modern, casual, or contemporary decor.', '3-Level Adjustable Brightness: This LED floor lamp features three brightness settings with a unique dimming sequence: Low-Off-Medium-Off-High-Off. This versatility makes it suitable for various activities such as reading, working, or everyday use. Each lighting mode offers gentle, eye-soothing illumination that is both functional and aesthetically pleasing.', 'E26 Bulbs Compatible: Equipped with an E26 socket, this tall lamp boasts excellent heat dissipation, ensuring a longer lifespan. It is compatible with various types of 3-level dimmable bulbs, although it is recommended to use three-way incandescent bulbs for optimal performance. (Note: 3-level dimming bulb not included, maximum 100W)', 'Safe & Easy Assembly: Simple and easy to assemble without extra tools, you just need to screw all the parts of the modern floor lamp working together by following the instruction. The bottom of the corner lamp adopts a weighted and stable design to prevent tipping and can be used near the elderly, children and pets; the lampshade is also made of resin plastic, which avoids the risk of breakage of the traditional glass lampshade.', 'Ideal Gifts for Decorative: This floor lamps for living room is a perfect holiday gift and birthday gift for mothers, fathers, wives, husbands, children, and friends. The Black Floor Lamp is also suitable for living room, bedroom, reading room, office, library, kitchen, coffee shop, hotel, restaurant, etc.'], 
    'category', ARRAY['home', 'sale', 'furniture', 'lamp', 'Home, Garden & Tools']
  ));

  -- Furniture 
  INSERT INTO product(id, data) VALUES ('131d1d6a-d21b-4918-8fd9-4c24367618b4', jsonb_build_object(
    'name', 'Der Rose 4 Packs Fake Plants Mini Artificial Greenery Potted Plants for Home Decor Indoor Office Table Room Farmhouse', 
    'price', 9.99, 'stock', 1000, 'rating', 4.5, 
    'image', ARRAY['https://f.media-amazon.com/images/I/814NZrz8EfL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71YUh1Ig0cL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/81UllOVS0SL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/81NMIJaQQrL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/714BuQE5sNL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71J8lLcvgkL._AC_SL1500_.jpg'], 
    'description', ARRAY['【Package Contains】 4 kinds of faux plants indoor, these artificial potted plants are made of friendly plastic', '【Perfect Size】The fake house plants are 7" tall and 2.5" wide, and the pot is 2.5" tall and 2.9" wide The size is just right for room decor', '【Long Life Span】The fake potted plants is designed with unique craftsmanship and looks like real. It doesn’t require special care, and it can maintain its fresh appearance', '【Fake Plants Decor】The small plants can be used in any scene. You can put these plants on windowsill, office,kitchen,desk, bathroom or put them in office to decorate your place well', '【Warm Tips】The leaves of these fake green plants can be adjusted freely. The leaves may be squeezed due to transportation. When you receive them, please comb the leaves to make them look plump and lush'], 
    'category', ARRAY['Fake Plants', 'sale', 'plants', 'furniture', 'Food & Grocery']
  ));
  INSERT INTO product(id, data) VALUES ('09cc271a-0f26-45d1-a774-4443fc732a45', jsonb_build_object(
    'name', 'Small Table Lamp for Bedroom - Bedside Lamps for Nightstand, Minimalist Night Stand Light Lamp with Square Fabric Shade, Desk Reading Lamp for Kids Room Living Room Office Dorm', 
    'price', 9.48, 'stock', 10, 'rating', 4.6, 
    'image', ARRAY['https://f.media-amazon.com/images/I/61xxhaeUKIL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71OK2yiVw5L._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71OQHbKCvJL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71D3pJ5j7mL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/7104yZrIByL._AC_SL1500_.jpg'], 
    'description', ARRAY['✪CHOICE FOR BETTER LIFE-The Cord, Socket and Plug of Aooshine bedside table lamp are UL listed. By giving products the listed, you don’t have to worry about the material problem. This Nightstand lamp comes with ON/OFF switch control, easy to install and use. Please note not included bulb. Please use the LED bulb only.', '✪MINIMALIST DESIGN-The elegant sleek look of this table lamp elevates the aesthetic of your home, an open-top cloth shade of beige linen hovers over a petite black base. The size and the design make this accent lamp a splendid accoutrement for guest cottages and professional offices alike.', '✪Comfortable Glow-Our small desk Lamp creates a nice and comforting feeling in the house when spending time with your family as the linen fabric shade softens the light. Lamps for nightstand is Not Dimmable.', '✪VERSATILE-With E26 universal standard base(Bulb not included), this minimalist rectangle table lamp is best for bedroom, living room, baby room, office, coffee table, college dorm, cafe, bookcase in your library or den. This night stand lights is also a great gift for your family and friend.(Please use the LED bulb, max watt of the LED bulb is 20W)', '✪BUY WITH CONFIDENCE-Having adhered the most demanding quality control procedures. Any problems, please tell us directly, and we will provide best service as we can.'], 
    'category', ARRAY['Bedside Table Lamps', 'furniture', 'Home, Garden & Tools', 'lamp']
  ));
  INSERT INTO product(id, data) VALUES ('e6c295cf-8037-40f7-b402-38db13bcef37', jsonb_build_object(
    'name', 'SUNMORY Floor Lamp with Shelves, Modern Square Standing Lamp with 3 Color Temperature Bulb, Corner Display Bookshelf Lamp for Living Room and Bedroom(Black)', 
    'price', 45.99, 'stock', 100, 'rating', 4.6, 
    'image', ARRAY['https://f.media-amazon.com/images/I/71YNhyHG-IL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/713ckbMCzAL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71ltoje4a+L._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/41rwaPMyeGL._AC_SL1230_.jpg', 'https://f.media-amazon.com/images/I/715faTljdeS._AC_SL1500_.jpg'], 
    'description', ARRAY['【3-Color Temperatures LED Bulb Included】SUNMORY shelf lamp includes a 9 Watt, 800 lumen power saving LED bulb ,so you don’t need to buy extra bulb.The LED lamp bulb is 3 color temp : 3000K/5000K/4000K.You can switch different color temperatures according to different scenes.Also can work with smart outlets that are Alexa, Google Home Assistant, or Apple HomeKit enabled(requires smart outlet sold separately).', '【Non-glaring Cloth Lampshade】This shelf floor lamp is equipped with a high-quality off-white cloth lampshade and opens upwards. With the built-in three-color temperature bulb, it can be used for both functional lighting and ambient lighting.', '【Storage & Display】This tall lamp has 3 layers of high density fiberboard, each with a maximum weight of more than 50 pounds. On the shelf, you can put decorations such as vases and photo frames, as well as daily necessities such as books and mobile phones. So it can be used as a corner lamp to decorate your living room or as a skinny nightstand with lamp to bring you life convenience.It is very suitable as a gift for Mothers Day, Thanksgiving Day, or Christmas.', '【Minimalist Design & Versatile Style】The contemporary stand up lamp matches asian, mid century modern, rustic, country and farmhouse decor thanks to its diverse lighting effects and simple lines.', '【Easy to Assemble】SUNMORY shelf floor lamp has been improved in craftsmanship and simplified the installation steps. Compared with other similar products, it will save you 30% percent of installation time.The accompanying package comes with the tools needed for assembly and an instruction manual containing text and video installation steps. Simple repetitive operations are very easy for most people. Warm Tip: Please tighten each post to keep the whole lamp stable.'], 
    'category', ARRAY['Floor Lamps by SUNMORY', 'lamp', 'Home, Garden & Tools', 'furniture']
  ));
  INSERT INTO product(id, data) VALUES ('da627ad0-e44c-42e3-8990-a94aa2303ee5', jsonb_build_object(
    'name', 'LED Floor Lamp for Living Room, Dimmable Standing Lamps with Foot Switch,Remote Custom Color Temperature Black Pole Lamp with Lampshade,12W Led Bulb Tall Lamps for Bedroom Office Kid Room', 
    'price', 35.99, 'stock', 100, 'rating', 4.8, 
    'image', ARRAY['https://f.media-amazon.com/images/I/71sGZjaa6kL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71ZofmHnMfL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71tNSdGeSUL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71o8KbxGhvL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/612IRIotvSL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71pl6QBEJeL._AC_SL1500_.jpg'], 
    'description', ARRAY['Multi-Function Dimmable Lamp: Vertical lamp includes an 12W dimmable LED bulbs that can be set to different color temperatures (3000K-6500K). 5%-100% dimmable brightness can be used to create different atmospheres and customize your favorite bedroom floor lamp.', 'Types Control: 50ft distance remote control precisely control the LED floor lamps even if there are obstacles. The magnetic remote attracts iron firmly and won’t drop. Sensitive Foot Switch.Handy to be used.', 'Stable Base&Linen LampShade: The newly upgraded tall lamps for living room has a metal base that is heavy enough to keep it firmly placed. The lampshade is made of linen material, which effectively blocks some of the light emitted from the bulb, making the light comfortable and soft.', 'Timer&Night Mode: After setting timer, the light will be turned off automatically to save energy. Night light mode creates a soft the comfort atmosphere to help you and your family sleep in peace.', 'The Perfect Gift:Luckystyle standing lamp is a good choice as the gift for wedding, moving, new baby or any festival. The floor lamp features a modern minimalist design that fits any decor.Decorations for bedrooms, living rooms, nurseries, offices and studies.'], 
    'category', ARRAY['LED Floor Lamps', 'lamp', 'Home, Garden & Tools', 'furniture']
  ));

  -- Adidas
  INSERT INTO product(id, data) VALUES ('2f804cfb-c81a-43e2-9e78-9160332e46bd', jsonb_build_object(
    'name', 'adidas Women’s Grand Court 2.0 Tennis Shoe', 'price', 59.99, 'stock', 40, 'rating', 4.6, 
    'image', ARRAY['https://a.media-amazon.com/images/I/61tF8x0bwBL._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/61B4qrX2NML._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/61pngdRaLOL._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/61g59QVZ+HL._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/61Heb8G9-oL._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/61+77WggX2L._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/81zBwlqLSUL._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/71D5dbUxHfL._AC_SL1500_.jpg'], 
    'description', ARRAY['Women’s tennis sneakers with a clean look', 'LIGHTWEIGHT COMFORT: Synthetic upper for durability and light weight', 'TWO-LAYER SOCKLINER: Cloudfoam Comfort sockliner is ultra-soft and plush, with two layers of cushioning topped with soft, breathable mesh', 'RUBBER OUTSOLE: The rubber outsole provides outstanding grip and a sleek, low-profile look', 'MADE WITH RECYCLED CONTENT: Made with a series of recycled materials, this upper features at least 50% recycled content. This product represents just one of our solutions to help end plastic waste'], 
    'category', ARRAY['Women’s shoes', 'adidas', 'shoes', 'women’s clothes', 'clothing', 'women', 'shoes', 'Clothing, Shoes & Jewelry']
  ));
  INSERT INTO product(id, data) VALUES ('572d681e-c916-46f2-9754-896590d82f3a', jsonb_build_object(
    'name', 'adidas Women’s Ultraboost 22 Running Shoe', 'price', 39.87, 'stock', 3, 'rating', 4.4, 
    'image', ARRAY['https://a.media-amazon.com/images/I/41QsH5MGLfL._AC_SL1000_.jpg', 'https://a.media-amazon.com/images/I/41yVmXXOfBL._AC_.jpg', 'https://a.media-amazon.com/images/I/41yVmXXOfBL._AC_.jpg', 'https://a.media-amazon.com/images/I/41emF7hRtwL._AC_.jpg', 'https://a.media-amazon.com/images/I/41BIjGe3HKL._AC_.jpg', 'https://a.media-amazon.com/images/I/41D6gL5x0BL._AC_.jpg', 'https://a.media-amazon.com/images/I/519jeZ6fSqL._AC_.jpg', 'https://a.media-amazon.com/images/I/613AEaD2LkL._AC_.jpg', 'https://a.media-amazon.com/images/I/51l9qOOF-7L._AC_.jpg'], 
    'description', ARRAY['BOOST midsole', 'Imported', 'Lace closure'], 
    'category', ARRAY['Ultraboost', 'Women’s shoes', 'women’s clothes', 'adidas', 'running shoe', 'clothing', 'shoes', 'Clothing, Shoes & Jewelry']
  ));
  INSERT INTO product(id, data) VALUES ('1c966d34-5079-4ead-82df-3aecc4b10d06', jsonb_build_object(
    'name', 'adidas Men’s Essentials Fleece Hoodie', 'price', 37.50, 'stock', 1000, 'rating', 4.7, 
    'image', ARRAY['https://a.media-amazon.com/images/I/71adyeaNiYL._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/71ruJTxV-zL._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/61nOjtz6zDL._AC_SL1000_.jpg'], 
    'description', ARRAY['adidas mens Hooded Sweatshirt'], 
    'category', ARRAY['Hoodie', 'adidas', 'men’s fashion', 'men’s clothing', 'sale', 'clothing', 'Clothing, Shoes & Jewelry']
  ));
  INSERT INTO product(id, data) VALUES ('4f9920d3-b733-4ab0-a7ef-2581a8578325', jsonb_build_object(
    'name', 'adidas Alliance Sackpack Drawstring Backpack Gym Bag, Black, One Size', 'price', 15, 'stock', 14, 'rating', 4.8, 
    'image', ARRAY['https://a.media-amazon.com/images/I/91YKb63wdfS._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/81N+kbbRLcS._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/916R20G6VTS._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/919iagHdn6S._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/91i3GpCFHVS._AC_SL1500_.jpg', 'https://a.media-amazon.com/images/I/61Gr2Fzc0lS._AC_SL1500_.jpg'], 
    'description', ARRAY['Drop mesh water bottle pockets.', 'Easy cinch opening with durable cording straps.', 'Zippered exterior pocket for your phone or small stuff.'], 
    'category', ARRAY['Gym Drawstring Bags by Adidas', 'adidas', 'bags', 'drawstring bags', 'sports', 'Clothing, Shoes & Jewelry', 'Sports & Outdoors']
  ));
  INSERT INTO product(id, data) VALUES ('91341777-8bfc-4dcf-97a8-29c6542c744e', jsonb_build_object(
    'name', 'adidas Unisex-Adult Adissage Slides Sandal', 'price', 20, 'stock', 100, 'rating', 4.4, 
    'image', ARRAY['https://m.media-amazon.com/images/I/41QXpdDWq-L._AC_SL1000_.jpg', 'https://m.media-amazon.com/images/I/41TBMZ+z8oL._AC_.jpg', 'https://m.media-amazon.com/images/I/31uCcQwUeeL._AC_.jpg', 'https://m.media-amazon.com/images/I/31zTdnN1KJL._AC_.jpg', 'https://m.media-amazon.com/images/I/31-3HRbtQpL._AC_.jpg', 'https://m.media-amazon.com/images/I/41IodvHk7PL._AC_.jpg', 'https://m.media-amazon.com/images/I/51-WjUCSFjL._AC_.jpg', 'https://m.media-amazon.com/images/I/61p4C1dZ4UL._AC_.jpg'], 
    'description', ARRAY['Adjustable fit; Hook-and-loop closure', 'Single-bandage EVA upper for lightweight comfort', 'EVA massage nubs on footbed', 'Cloudfoam midsole and memory foam sockliner for step-in comfort and superior cushioning'], 
    'category', ARRAY['Sandals', 'adidas', 'sports', 'clothing', 'shoes', 'unisex', 'Clothing, Shoes & Jewelry']
  ));

  -- Nike
  INSERT INTO product(id, data) VALUES ('d0eeec78-99ef-4736-8256-c04043110873', jsonb_build_object(
    'name', 'Nike Air Force 1 Low Women’s', 'price', 82.43, 'stock', 1000, 'rating', 4.6, 
    'image', ARRAY['https://f.media-amazon.com/images/I/61VTTRwFUdL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/61mkgKBrwPL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71qFlQucWlL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71eRiDk-W0L._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71kFpb7CTGL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/61CKnwS9B3L._AC_SL1500_.jpg'], 
    'description', ARRAY['Closure.type : Lace-Up', 'Heel.type : Flat', 'Height map : Low Top', 'Material : Nike Materials', 'Outer.material : Nike Materials'], 
    'category', ARRAY['Women’s shoes', 'nike', 'sports', 'shoes', 'clothing', 'Clothing, Shoes & Jewelry']
  ));
  INSERT INTO product(id, data) VALUES ('c3816390-dbbc-4fdb-8de6-4287dbf15999', jsonb_build_object(
    'name', 'Nike Men’s Sneaker,Running Shoes', 'price', 104.95, 'stock', 10000, 'rating', 4.6, 
    'image', ARRAY['https://f.media-amazon.com/images/I/71GMZVTMcsL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71kU7lrqw3L._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71SMFDbzZeL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/718fsIS2PuL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/61vNVHhyLuL._AC_SL1500_.jpg'], 
    'description', ARRAY['Rubber sole'], 
    'category', ARRAY['men’s shoes', 'sports', 'nike', 'shoes', 'clothing', 'Clothing, Shoes & Jewelry']
  ));
  INSERT INTO product(id, data) VALUES ('213e5426-5be1-4e3e-9d79-fde79636cd12', jsonb_build_object(
    'name', 'Nike mens Blazer Mid 77 Vintage', 'price', 94.98, 'stock', 10, 'rating', 4.6, 
    'image', ARRAY['https://f.media-amazon.com/images/I/71aw2Z+2WML._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/61RgxlQ24BL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/71h5bWbBaSL._AC_SL1500_.jpg', 'https://f.media-amazon.com/images/I/61wla26S4lL._AC_SL1500_.jpg'], 
    'description', ARRAY['Vintage leather and synthetic upper provides classic Blazer Mid 77 style with added comfort', 'Autoclave construction fuses midsole and outsole for streamlined retro look', 'Non-marking rubber outsole offers excellent traction and durability', 'Foam tongue and exposed foam collar provide throwback details', 'Lace-up closure allows a snug, adjustable fit'], 
    'category', ARRAY['Shoes by Nike', 'sports', 'nike', 'clothing', 'Clothing, Shoes & Jewelry']
  ));
    
  -- Smartphones
  INSERT INTO product(id, data) VALUES ('d9b42b3d-aa46-4791-8470-c9417d1db025', jsonb_build_object(
    'name', 'SAMSUNG Galaxy S24 Cell Phone, 256GB AI Smartphone, Unlocked Android, 50MP Camera, Fastest Processor, Long Battery Life, US Version, 2024, Cobalt Violet', 
    'price', 784.99, 'stock', 123, 'rating', 4.4, 
    'image', ARRAY['https://m.media-amazon.com/images/I/716UvwH-NvL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/715STRtiLbL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/711ru1TUtXL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81SAEi78GkL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71klvX4OIjL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71s3o-fls4L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61h4ZPaIdkL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71AFQz2LlmL._AC_SL1500_.jpg'], 
    'description', ARRAY['CIRCLE & SEARCH¹ IN A SNAP: What’s your favorite influencer wearing? Where’d they go on vacation? What’s that word mean? Don’t try to describe it — use Circle to Search1 with Google to get the answer; With S24 Series, circle it on your screen and learn more', 'REAL EASY, REAL-TIME TRANSLATIONS: Speak foreign languages on the spot with Live Translate²; Unlock the power of convenient communication with near real-time voice translations, right through your Samsung Phone app', 'NOTE SMARTER, NOT HARDER: Focus on capturing your notes and spend less time perfecting them; Note Assist³ will summarize, format, and even translate them for you; All of your notes are organized neatly so that you can find what you need', 'MORE WOW, LESS WORK: Turn every photo into a post-worthy masterpiece; Move or remove objects; Fill in empty space; Simply snap a pic and take it from great to jaw-dropping with Generative Edit', 'CAPTURE. SHARE. IMPRESS: Share more of life’s most share-worthy moments in natural, true-to-life color with 50MP camera', 'OUR MOST POWERFUL GALAXY SMARTPHONE YET: Jump seamlessly between apps without the wait and see content in high quality with our fastest processor yet, Snapdragon 8 Gen 3 for Galaxy⁵', 'PUT YOUR BEST TEXT FORWARD: Say the right thing at the right time in no time with Chat Assist⁶; Get real-time tone suggestions to make your writing sound more professional or conversational; Plus, make typos a thing of the past'], 
    'category', ARRAY['Cell Phones by SAMSUNG', 'samsung', 'cell phone', 'smartphones', 'Electronics', 'sale']
  ));
  INSERT INTO product(id, data) VALUES ('721d0dfe-c061-4737-a757-a440eac199c2', jsonb_build_object(
    'name', 'OnePlus 12,16GB RAM+512GB,Dual-SIM,Unlocked Android Smartphone,Supports 50W Wireless Charging,Latest Mobile Processor,Advanced Hasselblad Camera,5400 mAh Battery,2024,Flowy Emerald', 
    'price', 899.99, 'stock', 867, 'rating', 4.6, 
    'image', ARRAY['https://m.media-amazon.com/images/I/711F6T6aySL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81RZHSigxQL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61Sru-13o8L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61TsuQvqJ5L._AC_SL1500_.jpg'], 
    'description', ARRAY['Free 6 months of Google One and 3 months of Youtube Premium with purchase of OnePlus 12. (New accounts only for each service to qualify)', 'Pure Performance: The OnePlus 12 is powered by the latest Snapdragon 8 Gen 3, with up to 16GB of RAM. The improved processing power & graphics performance is supported by the latest Dual Cryo-velocity VC cooling chamber, which improves thermal efficiency & heat dissipation.', 'Brilliant Display: The OnePlus 12 has a stunning 2k 120Hz Super Fluid Display, with advanced LTPO for a brighter, smoother, and more vibrant viewing experience. With 4500 nits peak brightness, enjoying your content is effortless anywhere.', 'Powered by Trinity Engine: The OnePlus 12’s performance is optimized by the Trinity Engine, which accelerates various softwares to maximize the performance of your device. These include RAM-Vita, CPU-Vita, ROM-Vita, HyperTouch, HyperBoost, and HyperRendering (visit the official product page for more information).', 'Powerful, Versatile Camera: Explore the new 4th Gen Hasselblad Camera System for Mobile, packed with computational photography software and improved sensors. The OnePlus 12 boasts a 50MP primary camera, a 64MP 3x Periscope Lens, and a 48MP Ultra-Wide Camera, all packed together with industry-leading Hasselblad color science.', 'Ultra Fast Charging: A massive 5400 mAh battery is powered by an 80W SUPERVOOC Charger, plus the OnePlus 12 can charge wirelessly at 50W using a proprietary OnePlus 50W AIRVOOC Charger.'], 
    'category', ARRAY['Cell Phones by OnePlus', 'oneplus', 'cell phone', 'smartphones', 'Electronics']
  ));
  INSERT INTO product(id, data) VALUES ('5c696138-322c-41ec-9383-396f563ffe93', jsonb_build_object(
    'name', 'REDMAGIC 9 Pro Smartphone 5G, 120Hz Gaming Phone, 6.8" Full Screen, Under Display Camera, 6500mAh Android Phone, Snapdragon 8 Gen 3, 12+256GB, 80W Charger, Dual-Sim, US Unlocked Cell Phone Black', 
    'price', 749, 'stock', 456, 'rating', 4.3, 
    'image', ARRAY['https://m.media-amazon.com/images/I/51eUDrkf9RL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71tbSQK9jPL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61q4XnyvOYL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61tvqjBXp+L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/615uFTw75OL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/616puSVs2sL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71bVM4sDbEL._AC_SL1500_.jpg'], 
    'description', ARRAY['【6.8" FHD+ Full Screen】Gaming Phone with a 120Hz refresh rate and a resolution of 2480 x 1116 pixels, this 6.8" FHD+ Full AMOLED screen delivers beautiful HD+ visuals at up to 120 frames per second. With a 960Hz touch sampling rate for multi fingers, the Cell Phone delivers ultra-fast touch and precise response, giving you a serious competitive edge while gaming. The 5G Smartphone have also Under-display Fingerprint Sensor and 16MP Under Display Camera.', '【Latest Chip and Larger Storage】The Gaming Smartphone has the latest Qualcomm Snapdragon 8 Gen 3 (Red Core 2 Pro + UFS 4.0 + LPDDR5X). Play your favorite games with ease with the raw power of the new CPU clocking in at nearly 3.2GHz and enjoy Triple-A graphics thanks to the fast rendering power of the GPU. 12GB RAM + 256GB ROM provides not only a fun gaming experience and effects, also large storage space for game downloads.', '【Multi-Dimensional Cooling System】The Gaming Phone incorporates new aerospace-grade phase change materials (PCM) . Heat can be stored inside this material and released slowly so you feel less heat from the phone while playing, making it more comfortable to hold the phone. The High-Speed Built-In Turbofan accelerates heat dissipation and the fan noise is as quiet as a whisper.', '【5G & WIFI Connection and 6500mAh Battery】5G is SA+NSA dual mode and supports all key regions up to 3.0 Gbps uploads, up to 7.5 Gbps downloads. WIFI 7 is up to 3.5Gbps. These bring mobile gaming to a whole new level. Download the latest games and videos in gigabit speeds with ease to show off your smooth, low latency experience. The Cell Phone certified 80W GAN charger and supports 80W fast charging.', '【Ultra HD AI Quad Camera】Rear Camera are Samsung GN5 50MP Wide + Samsung JN1 50MP Ultrawide + 2MPMacro. The primary camera is upgraded to enable users to take fantastic photos and videos with a fast auto focus, even in the dimmest scenario. Every detail is captured. Thanks to dual pixel focusing, it ensures fast autofocus regardless. Front Camera is 16 Megapixel and 5nd generation under-display-camera.'], 
    'category', ARRAY['Cell Phones by REDMAGIC', 'redmagic', 'cell phone', 'smartphones', 'Electronics', 'gaming']
  ));
  INSERT INTO product(id, data) VALUES ('dffb74f2-060c-4b4f-b838-92e49394fcea', jsonb_build_object(
    'name', 'Google Pixel 8 - Unlocked Android Smartphone with Advanced Pixel Camera, 24-Hour Battery, and Powerful Security - Hazel - 256 GB', 
    'price', 609, 'stock', 56, 'rating', 4.3, 
    'image', ARRAY['https://m.media-amazon.com/images/I/71SfoZu9a3L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81kir2fBpJL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81HzhKILmkL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81cRIHRkzCL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/816oWLrLIEL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71lfbifwR5L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81eKg-3vWEL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71alRFofbEL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81HBNeCkItL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81uiS4T2wdL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71AQpqXQ5ML._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71Zb0QByDhL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71DGX4nnjnL._AC_SL1500_.jpg'], 
    'description', ARRAY['Pixel 8 is the helpful phone engineered by Google; the new Google Tensor G3 chip is custom-designed with Google AI for cutting-edge photo and video features and smarter ways to help', 'Unlocked Android 5G phone gives you the flexibility to change carriers and choose your own data plan; it works with Google Fi, Verizon, T-Mobile, AT&T, and other major carriers', 'Google Pixel 8 has a fully upgraded camera with advanced image processing to reveal vivid colors and striking details; and now with Macro Focus, even the smallest subjects can become spectacular images', 'The 6.2-inch Pixel 8 Actua display is super sharp, with rich, vivid colors; it’s fast and responsive for smoother gaming, scrolling, and moving between apps', 'Pixel’s Adaptive Battery can last over 24 hours; when Extreme Battery Saver is turned on, it can last up to 72 hours; and it charges faster than ever', 'Pixel 8 can notify first responders in an emergency and share your location, and can even detect if you’ve been in a severe car crash; if you’re unable to respond, your Pixel phone can call emergency services and notify your chosen contacts', 'With powerful security features, your Pixel phone helps keep your info safe; Google Tensor G3, VPN by Google One, and the Titan M2 security chip give your Pixel multiple layers of security'], 
    'category', ARRAY['Cell Phones by Google', 'google', 'cell phone', 'smartphones', 'Electronics', 'sale']
  ));
  INSERT INTO product(id, data) VALUES ('cf5bb11d-ad94-4401-8d00-08377079bc29', jsonb_build_object(
    'name', 'Honor Magic5 Pro 5G 512GB ROM 12GB RAM Smartphone 6.81" 120Hz 50MP AI Triple Camera, Dual SIM, Mobile Cell Phone Global EU/UK Model PGT-N19 Mobile Cell Phone (Green)', 
    'price', 999, 'stock', 6, 'rating', 4.6, 
    'image', ARRAY['https://m.media-amazon.com/images/I/71e92vj7YcL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71j6dGhJqCL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/7185t7uCBOL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71WorAZg0yL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/711-0qnBcCL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71x4CYLYjfL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81UXyceT8TL._AC_SL1500_.jpg'], 
    'description', ARRAY['【AI Motion Detection Capture】 HONOR Magic5 Pro can detect motion and capture the best shot automatically. Millisecond motion detection capture lets you easily take a photo, day or night, from far or near.', '【Super Dynamic Vivid Screen】 With the no. Ranked #1 in the DXOMARK Smartphone Display Ranking, the HONOR Magic5 Pro features a 6.81" LTPO Quad-Curved Floating Display 120Hz with 2160Hz PWM Dimming, ensuring an immersive and comfortable viewing experience.', '【Battery Innovation】HONOR Magic5 Pro uses a 5100mAh battery that offers 12.8% higher energy density compared to lithium batteries for longer use. Support up to 17 hours of online YouTube video playback or 11 hours of Snapchat browsing.', '【Best Wireless Transmission】HONOR Magic5 Pro features the industry’s first Wi-Fi/Bluetooth independent antenna architecture, which prevents interference between the two wireless networks, allows data to be transferred simultaneously, and allows you to stay connected even in a basement or in an elevator.', '【Flagship Performance】HONOR Magic5 Pro features the latest Snapdragon 8 Gen 2 mobile platform, an advanced 4nm processor with integrated Qualcomm Kryo CPU and Qualcomm Adreno GPU, enabling seamless productivity and uninterrupted entertainment at any time.'], 
    'category', ARRAY['Cell Phones by Honor', 'honor', 'huawei', 'cell phone', 'smartphones', 'Electronics']
  ));

  -- Couches
  INSERT INTO product(id, data) VALUES ('39432e80-2d72-4496-a6fd-bfb79f499956', jsonb_build_object(
    'name', 'Convertible Sectional Sofa Couch, 3 Seat L-Shaped Sofa with Linen Fabric, Movable Ottoman Small Couch for Small Apartments, Living Room and Office (Dark Gray)', 
    'price', 219.99, 'stock', 23, 'rating', 3.0, 
    'image', ARRAY['https://m.media-amazon.com/images/I/91AYz7vbfbL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71ahNlkv-NL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/91DxC2k45mL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81dZ6MQ7N-L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/915zXzIo4tL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/91h4LwAlzhL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/811JjH+dIdL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/717I8WoFx-L._AC_SL1500_.jpg'], 
    'description', ARRAY['Your sectional couch sofa will be delivered in two packages. If you do not receive all of them at the same time, please contact us, or just wait a bit as the other one is running to you whip and spur.', 'Made of high-density sponge, covered with breathable soft linen fabric, the high-resilience couch will provide you comfortable and soft cloud touch experience. The cushions are vacuum-packed. Thus, in order to get the best experience, please wait 48 hours to let it become the original shape.', 'Constructed from solid natural wood, S-shaped alloy springs, and high elastic bandages, the couch is durable and stable for long-term use. The cushion covers are removable and washable, easy for you to keep clean.', 'The reversible ottoman has multipurpose uses. Usually, you can put it on the left or right side to make it a side chaise recliner. Also, you can function it as a separate sofa stool, placing it anywhere you want in the room.', 'VICTONE small L-shaped couch is perfect for space-limited apartments, student dormitories, or offices. If you want a set of comfortable sofa but your room is not big enough, our sofa will be your first choice!'], 
    'category', ARRAY['Convertible Sectional Sofa Couch', 'couch', 'sofa', 'furniture', 'sale', 'Home, Garden & Tools']
  ));
  INSERT INTO product(id, data) VALUES ('67714aeb-e478-4e41-ace2-b823c07f1798', jsonb_build_object(
    'name', 'VanAcc 89 Inch Sofa, Comfy Sofa Couch with Extra Deep Seats, Modern Sofa- 3 Seater Sofa, Couch for Living Room Apartment Lounge, Beige Chenille', 
    'price', 269.99, 'stock', 84, 'rating', 4.0, 
    'image', ARRAY['https://m.media-amazon.com/images/I/81yBP3yD4ZL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81Yu5Pq-MDL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81dSkvG4Z+L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/818wwFaKzEL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81vhbf0y9PL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81a7bEyx96L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81+MRpRlQDL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81kcgq7JovL._AC_SL1500_.jpg'], 
    'description', ARRAY['【Spacious & Comfy Couch】VanAcc sofa provides perfect setting for leisure life. Comfy couch features 24in deep seating area, spacious armrest and thickend cushion, can meet your resting needs easily.', '【Fluffy Chenille Fabric】Upholstered in cloud-like chenille fabric, creamy couch offers a soft touch while providing a fuzzy texture. Chenille fabric decorates your home with warmth and calmness.', '【Modern Minimalist Couch】Straight clean edges and sleek track arms are hallmarks of modern style. Linear and minimalistic, the seat cushions are designed to fits with the armrests, lefting a simple look.', '【Sturdy Construction】Equipped with awesome hardwood underframe and steel frame back, deep seat sofa is designed to ensure solidity and durability. Featured with 900lbs weight capacity.', '【Straightforward Assembly】VanAcc deap seat sofa takes 2 people 15 minutes to assemble. Everything is packed in 1 box.2 back pillows are stored inside the armrests.'], 
    'category', ARRAY['Comfy Sofa Couch', 'sofa', 'couch', 'furniture', 'Home, Garden & Tools']
  ));
  INSERT INTO product(id, data) VALUES ('cb20e870-9d2d-4a36-9338-91847dca1d9d', jsonb_build_object(
    'name', 'Flamaker Futon Sofa Bed Modern Folding Futon Set Faux Leather Convertible Recliner Lounge for Living Room with 2 Cup Holders, Removable Armrests (Faux Leather, Black)', 
    'price', 149.98, 'stock', 6, 'rating', 3.8, 
    'image', ARRAY['https://m.media-amazon.com/images/I/71FKOHNHRjL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/8100nQ2ryAL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71y99po8BsL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81u+RW8bUOL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/51nYgQT9ujL._AC_SL1230_.jpg', 'https://m.media-amazon.com/images/I/81WidOqVigL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/711btx4L-gL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81ovMZbehzL._AC_SL1500_.jpg'], 
    'description', ARRAY['BACKREST ADJUSTABLE: The futon sofa bed has 3 positions adjustable back, among 120°, 160° and 180°, which allows you to get cozy in any scenario. By easy adjusting the back angle, you will get comfy position to watch TV, play games or take a nap.', 'CONVERTIBLE SOFA BED: This folding futon can be quickly and easily transformed into a comfy bed, to take a nap, or use as a guest bed, and the 2 removable armrests can be turned into pillows, providing you with certain support at sleep.', 'COZY TIME: The seat cushion is filled with high-resilient sponge, featuring soft and supportive, and covered by quality PU leather delivering exceptional comfort. Just make a cup of coffee and put it in the removable cupholder, sharing a leisure time with family or friends.', 'HIGH-QUALITY MATERIAL: Our futon sofa is made of smooth and selective PU leather, which is skin friendly and durable in use. The chrome metal legs help increase much stability that can hold up to 500 lbs.', 'MODERN FUTON SOFA: The delicate PU and glossy metal match adds simple and fashionable style to your living room, bedroom, office, guest room or study. Cuddle up in the soft comfort with this futon sofa bed from Flamaker.', 'EASY TO ASSEMBLE: Crafted for convenient shipment and easy assembly. Only few steps need, easy to follow the instructions, an adult can finish the assembling work within 20 minutes.', 'EXCELLENT CUSTOMER SERVICE: How to solve your problems quickly? Of course, contact the SELLER via Amazon! Our professional service team will respond to you within 24 hours. We hope you can get good service and satisfied shopping experience.'], 
    'category', ARRAY['Futon Sofa Bed', 'sofa', 'couch', 'futon', 'Home, Garden & Tools', 'bedroom', 'furniture']
  ));

  -- Cabinets
  INSERT INTO product(id, data) VALUES ('be38c711-ddd8-4779-a93f-d77e82227187', jsonb_build_object(
    'name', 'WEENFON Bathroom Cabinet, Floor Storage Cabinet with Doors and Shelves, Freestanding Coffee Bar Cabinet with Drawer, Modern Organizer Cabinet for Living Room, Bathroom, Kitchen, Gray', 
    'price', 89.99, 'stock', 5, 'rating', 4.3, 
    'image', ARRAY['https://m.media-amazon.com/images/I/81LZsH9QerL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/711N8gkAb+L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71bpCCmcqDL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71z7qdQdB9L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/712nU6kUiVL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/91o5+LHF9OL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81ndlJKMc1L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81hvv36BahL._AC_SL1500_.jpg'], 
    'description', ARRAY['DECORATE YOUR TIME, IT’S WORTH: Scientific design, greatly improving space utilization. The drawer, doors and opening shelves combination enriches the visual level, which not only effectively blocks dust, but also turns storage into a display art. The floor storage cabinet with shelves which has 3 adjustable heights can bigger and higher things', 'FIND THE SECRET TO A FRESH LIFE: Pairing door with 3 shelves, this storage cabinet provides display and storage functions for your various items, such as daily necessities, tableware, medicines, etc, these personal effects can place by category. You can sit back relax and know that everything is within your reach', 'FOLLOW YOUR CHOOSE: This floor storage cabinet is designed for various places - home office, living room, kitchen, entryway, restroom. It can also be used as display shelf or file cabinets', 'DURABLE MATERIAL: Free standing buffet cabinet made of durable natural particle board which promises a long lifespan. Environmentally friendly lacquered surface ensures no harm and easier to clean', 'EASY ASSEMBLY: WEENFON separated out the hardware for each step. Each step has its own, clearly numbered, bag of screws/parts, as fun as Lego build'], 
    'category', ARRAY['Storage Cabinets by WEENFON', 'cabinet', 'storage', 'drawer', 'kitchen', 'bathroom', 'Home, Garden & Tools', 'furniture', 'sale']
  ));
  INSERT INTO product(id, data) VALUES ('6b506670-603b-42e3-acea-6706dde5ff94', jsonb_build_object(
    'name', 'Yaheetech Wooden Floor Cabinet, Side Storage Organizer with 4 Drawers and 1 Cupboard, Freestanding Entryway Storage Unit Console Table, Bathroom Furniture Home Decor, White', 
    'price', 74.99, 'stock', 45, 'rating', 4.5, 
    'image', ARRAY['https://m.media-amazon.com/images/I/71254NAyE5L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71zXzycl9gL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71laQYJOHEL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/91CO7lEUr4L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81o5R4-qgYL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/819rWHvx2nL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/61OkdnTr-qL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/717uSHqB2xL._AC_SL1500_.jpg'], 
    'description', ARRAY['Sturdy construction: This free-standing cabinet is built in a solid structure with high load capacity up to 45 kg / 99 lb, meets your basic storage requirements.', 'Ideal space saver: Four drawers with cutout handles and one cupboard with a customizable shelf for you to organize different items like cosmetics, toiletries, towels, toilet paper, etc. A great option for tucking away bathroom clutter.', 'Waterproof surface: Painted MDF can withstand the humidity and prevent moisture, specially designed for humid occasions, perfect storage for bathroom and kitchen.', 'All-matching design: This bathroom storage cabinet showcases a sleek rectangular design with beadboard panels on the faces of drawers and door, making it an aesthetically-pleasing fit for any home décor from traditional to modern.', 'Easy to assemble: Comes with all necessary hardware and an illustrated instruction manual to help quick and effortless setup.'], 
    'category', ARRAY['Floor Cabinets', 'cabinet', 'storage', 'drawer', 'bathroom', 'kitchen', 'Home, Garden & Tools', 'furniture', 'sale']
  ));
  INSERT INTO product(id, data) VALUES ('315cd52a-4905-4c42-a0a7-0551a6bb69c3', jsonb_build_object(
    'name', 'ZeHuoGe Sideboard Buffet Accent Cabinet with Natural Rattan & Iron Legs, Sideboard Buffet Storage Cabinet,for Dining Room, Living Room, Kitchen (Rattan)', 
    'price', 48.89, 'stock', 14, 'rating', 4.1, 
    'image', ARRAY['https://m.media-amazon.com/images/I/914qUnxjFjL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/91V3VGwrDYL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81hTyzwPChL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/819YuXldD5L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81v9Ee0bt4L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/913cmNVjuML._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/81CysooVGbL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/91QUaYCuURL._AC_SL1500_.jpg'], 
    'description', ARRAY['【Natural Rattan Door Sideboard&Buffet】The raw material of the door panel with handle is made of natural rattan.', '【Classic Accent Cabinet 】Symmetrical 2 Magnetic Door Design, prominent round door handle, convenient opening and closing, moderate length, not easy to bump even when walking around the cabinet.', '【Adjustable Storage Shelf】3 adjustable holes are built in the cabinet, and the internal shelf is detachable, which is convenient for free combination and storage of items.', '【Sturdy and Stable Iron Frame Support】The horizontal bar under the panel has a reinforcing effect and can also increase the load-bearing capacity of the entire cabinet.', '【Multifunction Storage Cabinet】The metal base has strong stability and less contact with the ground, which is convenient for cleaning and cleaning.It can be used as cupboard, sideboard&buffet, storage cabinet, TV cabinet, living room decoration cabinet, console, accent cabinet, etc.'], 
    'category', ARRAY['Kitchen Storage', 'cabinet', 'storage', 'kitchen', 'furniture', 'Home, Garden & Tools']
  ));

-- CATEGORY TABLE
  INSERT INTO category (name) VALUES
    ('Movies, Music & Games'),
    ('Clothing, Shoes & Jewelry'),
    ('Electronics'),
    ('Household, Health & Baby Care'),
    ('Sports & Outdoors'),
    ('Home, Garden & Tools'),
    ('Pet Supplies'),
    ('Homemade'),
    ('Beauty & Health'),
    ('Toys, Kids & Baby'),
    ('Food & Grocery'),
    ('Automotive'),
    ('Industrial and Scientific'),
    ('Computers'),
    ('Smart Home'),
    ('movie'),
    ('dvd'),
    ('shrek'),
    ('AirTags'),
    ('apple'),
    ('sale'),
    ('Airpods by Apple'),
    ('airpods'),
    ('headphone'),
    ('Headphones by Apple'),
    ('sports'),
    ('basketball'),
    ('Spalding'),
    ('Molten'),
    ('lamp'),
    ('furniture'),
    ('Fake Plants'),
    ('plants'),
    ('Bedside Table Lamps'),
    ('home'),
    ('Floor Lamps by SUNMORY'),
    ('LED Floor Lamps'),
    ('Women’s shoes'),
    ('adidas'),
    ('shoes'),
    ('women’s clothes'),
    ('women'),
    ('clothing'),
    ('Ultraboost'),
    ('running shoe'),
    ('Hoodie'),
    ('men’s fashion'),
    ('men’s clothing'),
    ('Gym Drawstring Bags by Adidas'),
    ('bags'),
    ('drawstring bags'),
    ('sports'),
    ('Sandals'),
    ('unisex'),
    ('nike'),
    ('men’s shoes'),
    ('Shoes by Nike'),
    ('Gym Drawstring Bags by Adidas'),
    ('adidas'),
    ('bags'),
    ('drawstring bags'),
    ('sports'),
    ('Sandals'),
    ('clothing'),
    ('shoes'),
    ('unisex'),
    ('nike'),
    ('men’s shoes'),
    ('Shoes by Nike'),
    ('Cell Phones by SAMSUNG'),
    ('samsung'),
    ('cell phone'),
    ('smartphones'),
    ('sale'),
    ('Cell Phones by OnePlus'),
    ('oneplus'),
    ('Cell Phones by REDMAGIC'),
    ('redmagic'),
    ('cell phone'),
    ('smartphones'),
    ('gaming'),
    ('Cell Phones by Google'),
    ('google'),
    ('sale'),
    ('Cell Phones by Honor'),
    ('honor'),
    ('huawei'),
    ('Convertible Sectional Sofa Couch'),
    ('Comfy Sofa Couch'),
    ('couch'),
    ('sofa'),
    ('furniture'),
    ('Futon Sofa Bed'),
    ('futon'),
    ('bedroom'),
    ('Storage Cabinets by WEENFON'),
    ('cabinet'),
    ('storage'),
    ('drawer'),
    ('kitchen'),
    ('bathroom'),
    ('Floor Cabinets'),
    ('Kitchen Storage')
  ON CONFLICT (name) DO NOTHING;

-- JUNCTION TABLE
  -- Shrek DVD
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('6a2212e5-af0b-4472-a724-537bdc6c571c', (SELECT id FROM category WHERE name='movie')),
    ('6a2212e5-af0b-4472-a724-537bdc6c571c', (SELECT id FROM category WHERE name='dvd')),
    ('6a2212e5-af0b-4472-a724-537bdc6c571c', (SELECT id FROM category WHERE name='shrek')),
    ('6a2212e5-af0b-4472-a724-537bdc6c571c', (SELECT id FROM category WHERE name='Movies, Music & Games'));
  -- Shrek 2
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8', (SELECT id FROM category WHERE name='movie')),
    ('20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8', (SELECT id FROM category WHERE name='dvd')),
    ('20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8', (SELECT id FROM category WHERE name='shrek')),
    ('20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8', (SELECT id FROM category WHERE name='Movies, Music & Games'));
  -- Shrek 3
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('fb31be70-f4f3-4ccc-b483-14e831dc61d1', (SELECT id FROM category WHERE name='movie')),
    ('fb31be70-f4f3-4ccc-b483-14e831dc61d1', (SELECT id FROM category WHERE name='dvd')),
    ('fb31be70-f4f3-4ccc-b483-14e831dc61d1', (SELECT id FROM category WHERE name='shrek')),
    ('fb31be70-f4f3-4ccc-b483-14e831dc61d1', (SELECT id FROM category WHERE name='Movies, Music & Games'));
  -- Shrek Forever After
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('e64edcc9-3262-49b8-bda4-066c34089e05', (SELECT id FROM category WHERE name='movie')),
    ('e64edcc9-3262-49b8-bda4-066c34089e05', (SELECT id FROM category WHERE name='dvd')),
    ('e64edcc9-3262-49b8-bda4-066c34089e05', (SELECT id FROM category WHERE name='shrek')),
    ('e64edcc9-3262-49b8-bda4-066c34089e05', (SELECT id FROM category WHERE name='Movies, Music & Games'));
  -- Apple 2022 MacBook Air
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('fcdfc6a7-3e50-4909-818c-379f75b4320a', (SELECT id FROM category WHERE name='Electronics')),
    ('fcdfc6a7-3e50-4909-818c-379f75b4320a', (SELECT id FROM category WHERE name='apple')),
    ('fcdfc6a7-3e50-4909-818c-379f75b4320a', (SELECT id FROM category WHERE name='sale')),
    ('fcdfc6a7-3e50-4909-818c-379f75b4320a', (SELECT id FROM category WHERE name='Computers'));
  -- Apple 2023 MacBook Pro
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('8e2b4bd2-e946-45c5-9796-d23baa2b0ae5', (SELECT id FROM category WHERE name='Electronics')),
    ('8e2b4bd2-e946-45c5-9796-d23baa2b0ae5', (SELECT id FROM category WHERE name='apple')),
    ('8e2b4bd2-e946-45c5-9796-d23baa2b0ae5', (SELECT id FROM category WHERE name='sale')),
    ('8e2b4bd2-e946-45c5-9796-d23baa2b0ae5', (SELECT id FROM category WHERE name='Computers'));
  -- Apple 2024 MacBook Air
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('88db3140-54d2-4f1f-a552-7454bf55dcaf', (SELECT id FROM category WHERE name='Electronics')),
    ('88db3140-54d2-4f1f-a552-7454bf55dcaf', (SELECT id FROM category WHERE name='apple')),
    ('88db3140-54d2-4f1f-a552-7454bf55dcaf', (SELECT id FROM category WHERE name='sale')),
    ('88db3140-54d2-4f1f-a552-7454bf55dcaf', (SELECT id FROM category WHERE name='Computers'));
  -- Apple AirTag 4 Pack
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('090bafa5-dcf1-47c4-9b06-e76280aa75c0', (SELECT id FROM category WHERE name='AirTags')),
    ('090bafa5-dcf1-47c4-9b06-e76280aa75c0', (SELECT id FROM category WHERE name='apple')),
    ('090bafa5-dcf1-47c4-9b06-e76280aa75c0', (SELECT id FROM category WHERE name='sale')),
    ('090bafa5-dcf1-47c4-9b06-e76280aa75c0', (SELECT id FROM category WHERE name='Electronics')),
    ('090bafa5-dcf1-47c4-9b06-e76280aa75c0', (SELECT id FROM category WHERE name='Smart Home')),
    ('090bafa5-dcf1-47c4-9b06-e76280aa75c0', (SELECT id FROM category WHERE name='Pet Supplies'));
  -- Apple AirPods (2nd Generation)
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('caeb49c7-69bc-4ed9-ab3e-8cef39ed6c1d', (SELECT id FROM category WHERE name='Airpods by Apple')),
    ('caeb49c7-69bc-4ed9-ab3e-8cef39ed6c1d', (SELECT id FROM category WHERE name='apple')),
    ('caeb49c7-69bc-4ed9-ab3e-8cef39ed6c1d', (SELECT id FROM category WHERE name='sale')),
    ('caeb49c7-69bc-4ed9-ab3e-8cef39ed6c1d', (SELECT id FROM category WHERE name='Electronics')),
    ('caeb49c7-69bc-4ed9-ab3e-8cef39ed6c1d', (SELECT id FROM category WHERE name='airpods'));
  -- Apple AirPods Max Wireless Over-Ear Headphones
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('c49680cd-f184-4cee-a584-d9be7ddaf039', (SELECT id FROM category WHERE name='Headphones by Apple')),
    ('c49680cd-f184-4cee-a584-d9be7ddaf039', (SELECT id FROM category WHERE name='Electronics')),
    ('c49680cd-f184-4cee-a584-d9be7ddaf039', (SELECT id FROM category WHERE name='headphone')),
    ('c49680cd-f184-4cee-a584-d9be7ddaf039', (SELECT id FROM category WHERE name='apple')),
    ('c49680cd-f184-4cee-a584-d9be7ddaf039', (SELECT id FROM category WHERE name='airpods'));
  -- WILSON NCAA Street Shot Basketballs - 29.5"
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('86b0b448-fa22-4235-a88f-211e7619d44b', (SELECT id FROM category WHERE name='sports')),
    ('86b0b448-fa22-4235-a88f-211e7619d44b', (SELECT id FROM category WHERE name='sale')),
    ('86b0b448-fa22-4235-a88f-211e7619d44b', (SELECT id FROM category WHERE name='basketball')),
    ('86b0b448-fa22-4235-a88f-211e7619d44b', (SELECT id FROM category WHERE name='Sports & Outdoors'));
  -- WILSON Evolution Indoor Game Basketballs
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('c5f199c9-0799-43ad-848b-f7e8e76ee0e4', (SELECT id FROM category WHERE name='basketball')),
    ('c5f199c9-0799-43ad-848b-f7e8e76ee0e4', (SELECT id FROM category WHERE name='sale')),
    ('c5f199c9-0799-43ad-848b-f7e8e76ee0e4', (SELECT id FROM category WHERE name='sports')),
    ('c5f199c9-0799-43ad-848b-f7e8e76ee0e4', (SELECT id FROM category WHERE name='Sports & Outdoors'));
  -- Spalding React TF-250 Indoor-Outdoor Basketball
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('c85ddd6d-c3ef-4ba2-8951-a6f377c4fe94', (SELECT id FROM category WHERE name='Spalding')),
    ('c85ddd6d-c3ef-4ba2-8951-a6f377c4fe94', (SELECT id FROM category WHERE name='basketball')),
    ('c85ddd6d-c3ef-4ba2-8951-a6f377c4fe94', (SELECT id FROM category WHERE name='sale')),
    ('c85ddd6d-c3ef-4ba2-8951-a6f377c4fe94', (SELECT id FROM category WHERE name='sports')),
    ('c85ddd6d-c3ef-4ba2-8951-a6f377c4fe94', (SELECT id FROM category WHERE name='Sports & Outdoors'));
  -- Molten B7G3800
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('443c7147-9747-4f94-bc49-4dda3b7bfc59', (SELECT id FROM category WHERE name='Molten')),
    ('443c7147-9747-4f94-bc49-4dda3b7bfc59', (SELECT id FROM category WHERE name='basketball')),
    ('443c7147-9747-4f94-bc49-4dda3b7bfc59', (SELECT id FROM category WHERE name='sports')),
    ('443c7147-9747-4f94-bc49-4dda3b7bfc59', (SELECT id FROM category WHERE name='sale')),
    ('443c7147-9747-4f94-bc49-4dda3b7bfc59', (SELECT id FROM category WHERE name='Sports & Outdoors'));
  -- PESRAE Floor Lamp
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('fcab207a-fd48-4e81-a15d-a754f49fcd15', (SELECT id FROM category WHERE name='lamp')),
    ('fcab207a-fd48-4e81-a15d-a754f49fcd15', (SELECT id FROM category WHERE name='sale')),
    ('fcab207a-fd48-4e81-a15d-a754f49fcd15', (SELECT id FROM category WHERE name='furniture')),
    ('fcab207a-fd48-4e81-a15d-a754f49fcd15', (SELECT id FROM category WHERE name='Home, Garden & Tools'));
  -- luckystyle Floor Lamp
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('460ee6d3-e911-4b39-87f8-d342831f2b28', (SELECT id FROM category WHERE name='furniture')),
    ('460ee6d3-e911-4b39-87f8-d342831f2b28', (SELECT id FROM category WHERE name='sale')),
    ('460ee6d3-e911-4b39-87f8-d342831f2b28', (SELECT id FROM category WHERE name='lamp')),
    ('460ee6d3-e911-4b39-87f8-d342831f2b28', (SELECT id FROM category WHERE name='Home, Garden & Tools'));
  -- Standing Lamp, Led Floor Lamp
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('3f97fbe9-b883-463c-83cd-3d9e536a1d42', (SELECT id FROM category WHERE name='home')),
    ('3f97fbe9-b883-463c-83cd-3d9e536a1d42', (SELECT id FROM category WHERE name='sale')),
    ('3f97fbe9-b883-463c-83cd-3d9e536a1d42', (SELECT id FROM category WHERE name='furniture')),
    ('3f97fbe9-b883-463c-83cd-3d9e536a1d42', (SELECT id FROM category WHERE name='Home, Garden & Tools')),
    ('3f97fbe9-b883-463c-83cd-3d9e536a1d42', (SELECT id FROM category WHERE name='lamp'));
  -- Der Rose 4 Packs Fake Plants
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('131d1d6a-d21b-4918-8fd9-4c24367618b4', (SELECT id FROM category WHERE name='Fake Plants')),
    ('131d1d6a-d21b-4918-8fd9-4c24367618b4', (SELECT id FROM category WHERE name='sale')),
    ('131d1d6a-d21b-4918-8fd9-4c24367618b4', (SELECT id FROM category WHERE name='plants')),
    ('131d1d6a-d21b-4918-8fd9-4c24367618b4', (SELECT id FROM category WHERE name='furniture')),
    ('131d1d6a-d21b-4918-8fd9-4c24367618b4', (SELECT id FROM category WHERE name='Food & Grocery'));
  -- Small Table Lamp for Bedroom
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('09cc271a-0f26-45d1-a774-4443fc732a45', (SELECT id FROM category WHERE name='Home, Garden & Tools')),
    ('09cc271a-0f26-45d1-a774-4443fc732a45', (SELECT id FROM category WHERE name='sale')),
    ('09cc271a-0f26-45d1-a774-4443fc732a45', (SELECT id FROM category WHERE name='furniture')),
    ('09cc271a-0f26-45d1-a774-4443fc732a45', (SELECT id FROM category WHERE name='lamp'));
  -- SUNMORY Floor Lamp with Shelves
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('e6c295cf-8037-40f7-b402-38db13bcef37', (SELECT id FROM category WHERE name = 'Floor Lamps by SUNMORY')),
    ('e6c295cf-8037-40f7-b402-38db13bcef37', (SELECT id FROM category WHERE name = 'lamp')),
    ('e6c295cf-8037-40f7-b402-38db13bcef37', (SELECT id FROM category WHERE name = 'Home, Garden & Tools')),
    ('e6c295cf-8037-40f7-b402-38db13bcef37', (SELECT id FROM category WHERE name = 'furniture'));
  -- LED Floor Lamp for Living Room
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('da627ad0-e44c-42e3-8990-a94aa2303ee5', (SELECT id FROM category WHERE name = 'LED Floor Lamps')),
    ('da627ad0-e44c-42e3-8990-a94aa2303ee5', (SELECT id FROM category WHERE name = 'lamp')),
    ('da627ad0-e44c-42e3-8990-a94aa2303ee5', (SELECT id FROM category WHERE name = 'Home, Garden & Tools')),
    ('da627ad0-e44c-42e3-8990-a94aa2303ee5', (SELECT id FROM category WHERE name = 'furniture'));
  -- adidas Women’s Grand Court 2.0 Tennis Shoe
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('2f804cfb-c81a-43e2-9e78-9160332e46bd', (SELECT id FROM category WHERE name = 'Women’s shoes')),
    ('2f804cfb-c81a-43e2-9e78-9160332e46bd', (SELECT id FROM category WHERE name = 'adidas')),
    ('2f804cfb-c81a-43e2-9e78-9160332e46bd', (SELECT id FROM category WHERE name = 'women’s clothes')),
    ('2f804cfb-c81a-43e2-9e78-9160332e46bd', (SELECT id FROM category WHERE name = 'clothing')),
    ('2f804cfb-c81a-43e2-9e78-9160332e46bd', (SELECT id FROM category WHERE name = 'women')),
    ('2f804cfb-c81a-43e2-9e78-9160332e46bd', (SELECT id FROM category WHERE name = 'shoes')),
    ('2f804cfb-c81a-43e2-9e78-9160332e46bd', (SELECT id FROM category WHERE name = 'Clothing, Shoes & Jewelry'));
  -- adidas Women’s Ultraboost 22 Running Shoe
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('572d681e-c916-46f2-9754-896590d82f3a', (SELECT id FROM category WHERE name ='Ultraboost')),
    ('572d681e-c916-46f2-9754-896590d82f3a', (SELECT id FROM category WHERE name ='Women’s shoes')),
    ('572d681e-c916-46f2-9754-896590d82f3a', (SELECT id FROM category WHERE name ='women’s clothes')),
    ('572d681e-c916-46f2-9754-896590d82f3a', (SELECT id FROM category WHERE name ='adidas')),
    ('572d681e-c916-46f2-9754-896590d82f3a', (SELECT id FROM category WHERE name ='running shoe')),
    ('572d681e-c916-46f2-9754-896590d82f3a', (SELECT id FROM category WHERE name ='clothing')),
    ('572d681e-c916-46f2-9754-896590d82f3a', (SELECT id FROM category WHERE name ='shoes')),
    ('572d681e-c916-46f2-9754-896590d82f3a', (SELECT id FROM category WHERE name ='Clothing, Shoes & Jewelry'));
  -- adidas Men’s Essentials Fleece Hoodie
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('1c966d34-5079-4ead-82df-3aecc4b10d06', (SELECT id FROM category WHERE name ='Hoodie')),
    ('1c966d34-5079-4ead-82df-3aecc4b10d06', (SELECT id FROM category WHERE name ='adidas')),
    ('1c966d34-5079-4ead-82df-3aecc4b10d06', (SELECT id FROM category WHERE name ='men’s fashion')),
    ('1c966d34-5079-4ead-82df-3aecc4b10d06', (SELECT id FROM category WHERE name ='men’s clothing')),
    ('1c966d34-5079-4ead-82df-3aecc4b10d06', (SELECT id FROM category WHERE name ='sale')),
    ('1c966d34-5079-4ead-82df-3aecc4b10d06', (SELECT id FROM category WHERE name ='clothing')),
    ('1c966d34-5079-4ead-82df-3aecc4b10d06', (SELECT id FROM category WHERE name ='Clothing, Shoes & Jewelry'));
  -- adidas Alliance Sackpack Drawstring Backpack Gym Bag
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('4f9920d3-b733-4ab0-a7ef-2581a8578325', (SELECT id FROM category WHERE name='Gym Drawstring Bags by Adidas')),
    ('4f9920d3-b733-4ab0-a7ef-2581a8578325', (SELECT id FROM category WHERE name='adidas')),
    ('4f9920d3-b733-4ab0-a7ef-2581a8578325', (SELECT id FROM category WHERE name='bags')),
    ('4f9920d3-b733-4ab0-a7ef-2581a8578325', (SELECT id FROM category WHERE name='drawstring bags')),
    ('4f9920d3-b733-4ab0-a7ef-2581a8578325', (SELECT id FROM category WHERE name='sports')),
    ('4f9920d3-b733-4ab0-a7ef-2581a8578325', (SELECT id FROM category WHERE name='Clothing, Shoes & Jewelry'));
  -- adidas Unisex-Adult Adissage Slides Sandal
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('91341777-8bfc-4dcf-97a8-29c6542c744e', (SELECT id FROM category WHERE name='Sandals')),
    ('91341777-8bfc-4dcf-97a8-29c6542c744e', (SELECT id FROM category WHERE name='adidas')),
    ('91341777-8bfc-4dcf-97a8-29c6542c744e', (SELECT id FROM category WHERE name='sports')),
    ('91341777-8bfc-4dcf-97a8-29c6542c744e', (SELECT id FROM category WHERE name='clothing')),
    ('91341777-8bfc-4dcf-97a8-29c6542c744e', (SELECT id FROM category WHERE name='shoes')),
    ('91341777-8bfc-4dcf-97a8-29c6542c744e', (SELECT id FROM category WHERE name='unisex')),
    ('91341777-8bfc-4dcf-97a8-29c6542c744e', (SELECT id FROM category WHERE name='Clothing, Shoes & Jewelry'));
  -- Nike Air Force 1 Low Women’s
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('d0eeec78-99ef-4736-8256-c04043110873', (SELECT id FROM category WHERE name='Women’s shoes')),
    ('d0eeec78-99ef-4736-8256-c04043110873', (SELECT id FROM category WHERE name='nike')),
    ('d0eeec78-99ef-4736-8256-c04043110873', (SELECT id FROM category WHERE name='sports')),
    ('d0eeec78-99ef-4736-8256-c04043110873', (SELECT id FROM category WHERE name='shoes')),
    ('d0eeec78-99ef-4736-8256-c04043110873', (SELECT id FROM category WHERE name='clothing')),
    ('d0eeec78-99ef-4736-8256-c04043110873', (SELECT id FROM category WHERE name='Clothing, Shoes & Jewelry'));
  -- Nike Men’s Sneaker, Running Shoes
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('c3816390-dbbc-4fdb-8de6-4287dbf15999', (SELECT id FROM category WHERE name='men’s shoes')),
    ('c3816390-dbbc-4fdb-8de6-4287dbf15999', (SELECT id FROM category WHERE name='sports')),
    ('c3816390-dbbc-4fdb-8de6-4287dbf15999', (SELECT id FROM category WHERE name='nike')),
    ('c3816390-dbbc-4fdb-8de6-4287dbf15999', (SELECT id FROM category WHERE name='shoes')),
    ('c3816390-dbbc-4fdb-8de6-4287dbf15999', (SELECT id FROM category WHERE name='clothing')),
    ('c3816390-dbbc-4fdb-8de6-4287dbf15999', (SELECT id FROM category WHERE name='Clothing, Shoes & Jewelry'));
  -- Nike mens Blazer Mid 77 Vintage
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('213e5426-5be1-4e3e-9d79-fde79636cd12', (SELECT id FROM category WHERE name='Shoes by Nike')),
    ('213e5426-5be1-4e3e-9d79-fde79636cd12', (SELECT id FROM category WHERE name='sports')),
    ('213e5426-5be1-4e3e-9d79-fde79636cd12', (SELECT id FROM category WHERE name='nike')),
    ('213e5426-5be1-4e3e-9d79-fde79636cd12', (SELECT id FROM category WHERE name='clothing')),
    ('213e5426-5be1-4e3e-9d79-fde79636cd12', (SELECT id FROM category WHERE name='Clothing, Shoes & Jewelry'));
  -- SAMSUNG Galaxy S24 Cell Phone
    INSERT INTO product_category (product_id, category_id) VALUES   
    ('d9b42b3d-aa46-4791-8470-c9417d1db025', (SELECT id FROM category WHERE name='Cell Phones by SAMSUNG')),
    ('d9b42b3d-aa46-4791-8470-c9417d1db025', (SELECT id FROM category WHERE name='samsung')),
    ('d9b42b3d-aa46-4791-8470-c9417d1db025', (SELECT id FROM category WHERE name='cell phone')),
    ('d9b42b3d-aa46-4791-8470-c9417d1db025', (SELECT id FROM category WHERE name='smartphones')),
    ('d9b42b3d-aa46-4791-8470-c9417d1db025', (SELECT id FROM category WHERE name='Electronics')),
    ('d9b42b3d-aa46-4791-8470-c9417d1db025', (SELECT id FROM category WHERE name='sale'));
  -- OnePlus 12
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('721d0dfe-c061-4737-a757-a440eac199c2', (SELECT id FROM category WHERE name='Cell Phones by OnePlus')),
    ('721d0dfe-c061-4737-a757-a440eac199c2', (SELECT id FROM category WHERE name='oneplus')),
    ('721d0dfe-c061-4737-a757-a440eac199c2', (SELECT id FROM category WHERE name='cell phone')),
    ('721d0dfe-c061-4737-a757-a440eac199c2', (SELECT id FROM category WHERE name='smartphones')),
    ('721d0dfe-c061-4737-a757-a440eac199c2', (SELECT id FROM category WHERE name='Electronics'));
  -- REDMAGIC Phone
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('5c696138-322c-41ec-9383-396f563ffe93', (SELECT id FROM category WHERE name='Cell Phones by REDMAGIC')),
    ('5c696138-322c-41ec-9383-396f563ffe93', (SELECT id FROM category WHERE name='redmagic')),
    ('5c696138-322c-41ec-9383-396f563ffe93', (SELECT id FROM category WHERE name='cell phone')),
    ('5c696138-322c-41ec-9383-396f563ffe93', (SELECT id FROM category WHERE name='smartphones')),
    ('5c696138-322c-41ec-9383-396f563ffe93', (SELECT id FROM category WHERE name='Electronics')),
    ('5c696138-322c-41ec-9383-396f563ffe93', (SELECT id FROM category WHERE name='gaming'));
  -- Google Pixel 8
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('dffb74f2-060c-4b4f-b838-92e49394fcea', (SELECT id FROM category WHERE name='Cell Phones by Google')),
    ('dffb74f2-060c-4b4f-b838-92e49394fcea', (SELECT id FROM category WHERE name='google')),
    ('dffb74f2-060c-4b4f-b838-92e49394fcea', (SELECT id FROM category WHERE name='cell phone')),
    ('dffb74f2-060c-4b4f-b838-92e49394fcea', (SELECT id FROM category WHERE name='smartphones')),
    ('dffb74f2-060c-4b4f-b838-92e49394fcea', (SELECT id FROM category WHERE name='Electronics')),
    ('dffb74f2-060c-4b4f-b838-92e49394fcea', (SELECT id FROM category WHERE name='sale'));
  -- Honor Magic5 Pro
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('cf5bb11d-ad94-4401-8d00-08377079bc29', (SELECT id FROM category WHERE name='Cell Phones by Honor')),
    ('cf5bb11d-ad94-4401-8d00-08377079bc29', (SELECT id FROM category WHERE name='honor')),
    ('cf5bb11d-ad94-4401-8d00-08377079bc29', (SELECT id FROM category WHERE name='huawei')),
    ('cf5bb11d-ad94-4401-8d00-08377079bc29', (SELECT id FROM category WHERE name='cell phone')),
    ('cf5bb11d-ad94-4401-8d00-08377079bc29', (SELECT id FROM category WHERE name='smartphones')),
    ('cf5bb11d-ad94-4401-8d00-08377079bc29', (SELECT id FROM category WHERE name='Electronics'));
  -- Convertible Sectional Sofa Couch
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('39432e80-2d72-4496-a6fd-bfb79f499956', (SELECT id FROM category WHERE name='Convertible Sectional Sofa Couch')),
    ('39432e80-2d72-4496-a6fd-bfb79f499956', (SELECT id FROM category WHERE name='couch')),
    ('39432e80-2d72-4496-a6fd-bfb79f499956', (SELECT id FROM category WHERE name='sofa')),
    ('39432e80-2d72-4496-a6fd-bfb79f499956', (SELECT id FROM category WHERE name='furniture')),
    ('39432e80-2d72-4496-a6fd-bfb79f499956', (SELECT id FROM category WHERE name='sale')),
    ('39432e80-2d72-4496-a6fd-bfb79f499956', (SELECT id FROM category WHERE name='Home, Garden & Tools'));
  -- VanAcc 89 Inch Sofa
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('67714aeb-e478-4e41-ace2-b823c07f1798', (SELECT id FROM category WHERE name='Comfy Sofa Couch')),
    ('67714aeb-e478-4e41-ace2-b823c07f1798', (SELECT id FROM category WHERE name='sofa')),
    ('67714aeb-e478-4e41-ace2-b823c07f1798', (SELECT id FROM category WHERE name='couch')),
    ('67714aeb-e478-4e41-ace2-b823c07f1798', (SELECT id FROM category WHERE name='furniture')),
    ('67714aeb-e478-4e41-ace2-b823c07f1798', (SELECT id FROM category WHERE name='Home, Garden & Tools'));
  -- Flamaker Futon Sofa Bed
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('cb20e870-9d2d-4a36-9338-91847dca1d9d', (SELECT id FROM category WHERE name='Futon Sofa Bed')),
    ('cb20e870-9d2d-4a36-9338-91847dca1d9d', (SELECT id FROM category WHERE name='sofa')),
    ('cb20e870-9d2d-4a36-9338-91847dca1d9d', (SELECT id FROM category WHERE name='couch')),
    ('cb20e870-9d2d-4a36-9338-91847dca1d9d', (SELECT id FROM category WHERE name='futon')),
    ('cb20e870-9d2d-4a36-9338-91847dca1d9d', (SELECT id FROM category WHERE name='Home, Garden & Tools')),
    ('cb20e870-9d2d-4a36-9338-91847dca1d9d', (SELECT id FROM category WHERE name='bedroom')),
    ('cb20e870-9d2d-4a36-9338-91847dca1d9d', (SELECT id FROM category WHERE name='furniture'));
  -- WEENFON Bathroom Cabinet
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('be38c711-ddd8-4779-a93f-d77e82227187', (SELECT id FROM category WHERE name='Storage Cabinets by WEENFON')),
    ('be38c711-ddd8-4779-a93f-d77e82227187', (SELECT id FROM category WHERE name='cabinet')),
    ('be38c711-ddd8-4779-a93f-d77e82227187', (SELECT id FROM category WHERE name='storage')),
    ('be38c711-ddd8-4779-a93f-d77e82227187', (SELECT id FROM category WHERE name='drawer')),
    ('be38c711-ddd8-4779-a93f-d77e82227187', (SELECT id FROM category WHERE name='kitchen')),
    ('be38c711-ddd8-4779-a93f-d77e82227187', (SELECT id FROM category WHERE name='bathroom')),
    ('be38c711-ddd8-4779-a93f-d77e82227187', (SELECT id FROM category WHERE name='Home, Garden & Tools')),
    ('be38c711-ddd8-4779-a93f-d77e82227187', (SELECT id FROM category WHERE name='furniture')),
    ('be38c711-ddd8-4779-a93f-d77e82227187', (SELECT id FROM category WHERE name='sale'));
  -- Yaheetech Wooden Floor Cabinet
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('6b506670-603b-42e3-acea-6706dde5ff94', (SELECT id FROM category WHERE name='Floor Cabinets')),
    ('6b506670-603b-42e3-acea-6706dde5ff94', (SELECT id FROM category WHERE name='cabinet')),
    ('6b506670-603b-42e3-acea-6706dde5ff94', (SELECT id FROM category WHERE name='storage')),
    ('6b506670-603b-42e3-acea-6706dde5ff94', (SELECT id FROM category WHERE name='drawer')),
    ('6b506670-603b-42e3-acea-6706dde5ff94', (SELECT id FROM category WHERE name='bathroom')),
    ('6b506670-603b-42e3-acea-6706dde5ff94', (SELECT id FROM category WHERE name='kitchen')),
    ('6b506670-603b-42e3-acea-6706dde5ff94', (SELECT id FROM category WHERE name='Home, Garden & Tools')),
    ('6b506670-603b-42e3-acea-6706dde5ff94', (SELECT id FROM category WHERE name='sale')),
    ('6b506670-603b-42e3-acea-6706dde5ff94', (SELECT id FROM category WHERE name='furniture'));
  -- ZeHuoGe Sideboard Buffet Accent Cabinet
    INSERT INTO product_category (product_id, category_id) VALUES 
    ('315cd52a-4905-4c42-a0a7-0551a6bb69c3', (SELECT id FROM category WHERE name='Kitchen Storage')),
    ('315cd52a-4905-4c42-a0a7-0551a6bb69c3', (SELECT id FROM category WHERE name='cabinet')),
    ('315cd52a-4905-4c42-a0a7-0551a6bb69c3', (SELECT id FROM category WHERE name='storage')),
    ('315cd52a-4905-4c42-a0a7-0551a6bb69c3', (SELECT id FROM category WHERE name='kitchen')),
    ('315cd52a-4905-4c42-a0a7-0551a6bb69c3', (SELECT id FROM category WHERE name='Home, Garden & Tools')),
    ('315cd52a-4905-4c42-a0a7-0551a6bb69c3', (SELECT id FROM category WHERE name='furniture'));
