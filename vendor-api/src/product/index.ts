export interface NewProduct {
  name: string,
  price: number,
  stock: number,
  rating: number,
  image: string[],
  category: string[],
  description: string[]
}

export interface Product {
  id: string,
  name: string,
  price: number,
  stock: number,
  rating: number,
  image: string[],
  category: string[],
  description: string[]
}