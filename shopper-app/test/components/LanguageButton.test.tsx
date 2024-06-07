import { render } from '@testing-library/react';
import LanguageButton from '@/components/Language';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

it('Renders', async () => {
  render(
    <LanguageButton />
  );
});
