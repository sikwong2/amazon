import { CheckoutItem } from "@/components/CheckoutItem";
import { graphql, HttpResponse } from 'msw'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { LoginContext } from '@/context/Login';


// https://www.npmjs.com/package/next-router-mock
jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
      },
    };
  },
}));

// used for mocking useMediaQuery breakpoints (xs: 0, sm: 600, md: 900, lg: 1200)
// https://mui.com/material-ui/react-use-media-query/#testing
// Utility function to create matchMedia mock
import mediaQuery from 'css-mediaquery';

function createMatchMedia(width: number) {
  return (query: string): MediaQueryList => {
    const listeners: Array<(e: MediaQueryListEvent) => void> = [];

    const instance: MediaQueryList = {
      matches: mediaQuery.match(query, { width }),
      media: query,
      addListener: (listener: (e: MediaQueryListEvent) => void) => {
        listeners.push(listener);
      },
      removeListener: (listener: (e: MediaQueryListEvent) => void) => {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      },
      addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
        if (type === 'change') {
          listeners.push(listener as (e: MediaQueryListEvent) => void);
        }
      },
      removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
        if (type === 'change') {
          const index = listeners.indexOf(listener as (e: MediaQueryListEvent) => void);
          if (index !== -1) {
            listeners.splice(index, 1);
          }
        }
      },
      dispatchEvent: (event: Event) => true,
      onchange: null
    };

    return instance;
  };
}


const setScreenWidth = (width: number) => {
  window.matchMedia = createMatchMedia(width);
};

const testproduct = {
  name: 'test',
  price: 123,
  stock: 123,
  rating: 4,
  image: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg']
}

it('Renders', async() => {
  render(
    <CheckoutItem productId={"1234"} product={testproduct} quantity={4} />
  )
  expect(screen.getByLabelText('checkoutitem-image')).toBeDefined();
  fireEvent.click(screen.getByLabelText('checkoutitem-image'));
  expect(screen.getByLabelText('checkoutitem-dropdown')).toBeDefined();
  const dropdown = screen.getByLabelText('checkoutitem-dropdown');
  expect(dropdown).toBeDefined();
  fireEvent.mouseDown(dropdown.querySelector('.MuiSelect-select')!);
  await waitFor(() => {
    const options = screen.getAllByRole('option');// Should match the stock number
  });
  const option = screen.getByText('5');
  fireEvent.click(option);
})

it('Renders with Mobile', async() => {
  setScreenWidth(100);
  render(
    <CheckoutItem productId={"1234"} product={testproduct} quantity={4} />
  )
  expect(screen.getByLabelText('checkoutitem-image')).toBeDefined();
  fireEvent.click(screen.getByLabelText('checkoutitem-image'));
  expect(screen.getByLabelText('checkoutitem-dropdown')).toBeDefined();
  const dropdown = screen.getByLabelText('checkoutitem-dropdown');
  expect(dropdown).toBeDefined();
  fireEvent.mouseDown(dropdown.querySelector('.MuiSelect-select')!);
  await waitFor(() => {
    const options = screen.getAllByRole('option');// Should match the stock number
  });
  const option = screen.getByText('5');
  fireEvent.click(option);
})