import { render } from '@testing-library/react';
import Rating from '@/components/Rating';

it('Renders', async () => {
  render(
    <Rating rating={5}/>
  );
});
