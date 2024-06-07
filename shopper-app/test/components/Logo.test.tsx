import { render } from '@testing-library/react';
import Logo from '@/components/Logo';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

it('Renders', async () => {
  render(
    <Logo />
  );
});