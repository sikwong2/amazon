import { render } from '@testing-library/react';
import CustomCard from '@/components/Card';

it('Renders', async () => {
  render(
    <>
      <CustomCard />
      <CustomCard type='pointy' />
    </>
  );
});
