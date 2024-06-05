import { it, beforeAll, afterAll, afterEach, describe, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';


import { Checkout } from '@/views/Checkout';

const server = setupServer(
  rest.get('/api/graphql', (req, res) => {
    return res(
      ctx.json({
        data: {
          getMemberInfo: {
            name: 'John Doe',
            address: '123 Main St',
          },
          getByProductId: {
            id: '1',
            name: 'Product 1',
            price: 10,
            stock: 5,
            image: ['image1.jpg'],
            rating: 4,
            category: ['Category'],
            description: ['Description'],
          },
        },
      }),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Checkout Page', () => {
  it('Renders Checkout page', async () => {
    render(<Checkout />);

    // Expect initial loading state or specific elements to be rendered
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());
  });
});
