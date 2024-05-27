export interface StatusUpdate {
  status: 'pending' | 'confirmed' | 'shipped' | 'delayed' | 'out for delivery' | 'delivered' | 'cancelled' | 'refunded' | 'returned'
}