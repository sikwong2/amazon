export interface NewProduct {
  name: string,
  price: number,
  stock: number,
  image?: string[],
  rating?: number,
  category?: string[],
}

export interface Product {
  id: string,
  data: {
    name: string,
    price: number,
    stock: number,
    image?: string[],
    rating?: number,
    category?: string[],
  }
}

export type Order = 'price' | 'name' | 'stock' | 'image' | 'rating' | 'category';

export type Sort = 'ASC' | 'DESC'