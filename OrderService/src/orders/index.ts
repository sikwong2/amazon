export type OrdersInfo = {
  orderId: string;
  products: string[];
  shopperId: string;
  vendorId: string;
  orderStatus: string;
};

export type OrderResponse = {
  orderId: string;
};

export type OrderUpdate = {
  statusCode: number;
};
