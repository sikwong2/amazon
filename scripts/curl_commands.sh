curl -k -X 'POST' \
  'https://ucsc-amazon.com/vendorapi/v0/product' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMWYxZGFhNGMtNzNjMi00ZTMyLTg0NjMtMjEwMjFiODVmZWRjIiwiYWNjb3VudF9pZCI6IjMzZDY0NmRmLTFmNGEtNDEzMC04NTkwLTcyMGY0NWJhNDE3OSIsImlhdCI6MTcxNzQ1NzM2N30.ZhZkf65slydCj4n51PU7ml-l65fa-GhC5EMNN0HiAqQ' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Plantar Fasciitis Feet Insoles Arch Supports Orthotics Inserts Relieve Flat Feet, High Arch, Foot Pain Mens 1010 12  Womens 1212 12",
  "price": 13.29,
  "stock": 88,
  "rating": 2,
  "image": ["https://m.media-amazon.com/images/I/81GZas+udVL._AC_SX522_.jpg", "https://m.media-amazon.com/images/I/81GZas+udVL._AC_SX569_.jpg", "https://m.media-amazon.com/images/I/81GZas+udVL._AC_SX450_.jpg", "https://m.media-amazon.com/images/I/81GZas+udVL._AC_SX425_.jpg", "https://m.media-amazon.com/images/I/81GZas+udVL._AC_SX466_.jpg"],
  "category": ["Generated"],
  "description": ["Designed to provide relief for plantar fasciitis, flat feet, high arches, and foot pain, these insoles are the perfect solution for allday comfort. The orthotic inserts feature targeted arch support and cushioning to help alleviate discomfort and promote better foot alignment. Whether youre on your feet all day at work or enjoying a leisurely stroll, these insoles will help improve your overall foot health and provide the support you need. Available in mens sizes 1012 and womens sizes 1212, these insoles are a musthave for anyone seeking relief from foot conditions."]
}'

