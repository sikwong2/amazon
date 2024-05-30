# API Definition

`GET /api/v0/order/{vendorId}`

- Returns: `[{productId: string, shopperId: string, vendorId: string, orderStatus: string}]` (see Order Database)
- Codes: 200 OK

# Build

Build before running:

`$ npm run build`

# Run

Run on port 3020
`$ npm run dev`

# Notes

Couldn't get TS to compile Request with user (`/src/types/index.d.ts`) properly for some reason even though it's copied from assignments
