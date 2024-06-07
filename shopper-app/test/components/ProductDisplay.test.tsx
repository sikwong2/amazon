import { render } from '@testing-library/react';
import ProductDisplay from '@/components/ProductDisplay';

const images = [ "https://a.media-amazon.com/images/I/416fdJd0LBL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/41AZ1yXc7cL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51YxNfaeFML._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51yV-FSaDxL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51reoAsu51L._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51OHTX2eMYL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/61y-6VpkJBL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/61BKQwvRARL._AC_SL1000_.jpg" ]

it('Renders', async () => {
  render(
    <ProductDisplay images={images}/>
  );
});
