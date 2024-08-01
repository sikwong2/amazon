export interface NewPost {
  images?: Image[],
  content: string,
  rating: number,
  title: string,
  name: string
}

export interface Posted {
  id: string,
  shopper_id: string,
  product_id: string,
  images?: Image[],
  content: string,
  title: string,
  posted: Date,
  name: string,
  rating: number
}

/**
 * UUID https://www.uuidtools.com/what-is-uuid
 * @pattern ^/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/$
 * @example "https://uploads.dailydot.com/2023/12/crying-cat-meme.jpg?auto=compress&fm=pjpg"
 */
export type Image = string;

