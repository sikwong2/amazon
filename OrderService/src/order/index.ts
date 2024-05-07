
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

export type OrderInfo = {
  productId: string
  shopperId: string
  vendorId: string
}

export type OrderResponse = {
  orderId: string
}


