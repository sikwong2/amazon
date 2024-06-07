import { render } from '@testing-library/react';
import TopBar from '@/components/TopBar';
import { SearchProvider } from '@/context/SearchContext';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

it('Renders', async () => {
  render(
    <SearchProvider>
      <TopBar/>
    </SearchProvider>
  );
});
