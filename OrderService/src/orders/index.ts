
export interface Authenticated {
  id: string,
  name: string,
  accessToken: string
}

export interface Credentials {
  email: string,
  password: string
}

export type SessionUser = {
  id: string,
  role: string
}

export type OrdersInfo = {
  orderId: string
  productId: string
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