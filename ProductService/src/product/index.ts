export interface NewProduct {
  name: string,
  price: number,
  stock: number,
  image: string[],
  rating?: number,
  description?: string[],
  categories?: string[],
}

export interface Product {
  id: string,
  name: string,
  price: number,
  stock: number,
  image: string[],
  rating?: number,
  description?: string[],
  categories?: string[],
}

