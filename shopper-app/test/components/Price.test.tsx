import { render } from '@testing-library/react';
import CustomPrice from '@/components/Price';

it('Renders', async () => {
  render(
    <CustomPrice value={99}/>
  );
});
