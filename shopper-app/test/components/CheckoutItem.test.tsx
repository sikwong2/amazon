import { render } from '@testing-library/react';
import { CheckoutItem } from '@/components/CheckoutItem';

const pegasus = {
  "name": "Nike Men'\''s Air Zoom Pegasus 38 Running Shoe", 
  "price": 89.95, 
  "stock": 2, 
  "rating": 4.4, 
  "image": [ "https://a.media-amazon.com/images/I/416fdJd0LBL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/41AZ1yXc7cL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51YxNfaeFML._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51yV-FSaDxL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51reoAsu51L._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51OHTX2eMYL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/61y-6VpkJBL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/61BKQwvRARL._AC_SL1000_.jpg" ], 
  "category": [ "Nike Pegasus 38", "Nike", "air zoom pegasus", "shoes", "men'\''s shoes", "clothing", "clothes", "sale" ], 
  "description": [ "Upper material: Fabric", "Great quality", "Effectiveness in activities","Comfort and ease" ]
}

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

it('Renders', async () => {
  render(
    <CheckoutItem productId='123' product={pegasus} quantity={2}/>
  );
});
