
export type OrderInfo = {
  products: string[]
  shopperId: string
  vendorId: string
  orderStatus: string
}

export type OrderResponse = {
  orderId: string
}

export type OrderUpdate = {
  statusCode: number
}