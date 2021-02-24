import { render, screen, within, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import App from './App';
import { makeServer } from './mirage/server';
// import { sharedScenario } from './mirage/shared.scenario';

const queryClient = new QueryClient();

const Wrapped = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

let server;

beforeEach(() => {
  server = makeServer();
  // sharedScenario(server);
  // server.loadFixtures('books');
});

afterEach(() => {
  server.shutdown();
});

describe('Render home page', () => {
  it('shows header title', async () => {
    // server.loadFixtures('books');
    // server.createList('book', 5);
    render(
      <Wrapped>
        <App />
      </Wrapped>
    );

    const title = screen.getByText(/A book is just a Mirage/i);
    expect(title).toBeInTheDocument();
  });

  it('shows loading message', async () => {
    // server.loadFixtures('books');
    // server.createList('book', 5);
    render(
      <Wrapped>
        <App />
      </Wrapped>
    );

    const loader = screen.getByText(/loading.../i);

    expect(loader).toBeInTheDocument();
  });

  it('displays books list', async () => {
    // server.loadFixtures('books');
    // server.createList('book', 5);
    render(
      <Wrapped>
        <App />
      </Wrapped>
    );

    // We must waitFor the list to load
    await waitFor(async () => {
      const list = screen.getByRole('list', { name: /books/i });

      // screen.debug();
      const { getAllByRole } = within(list);
      const items = getAllByRole('listitem');
      expect(items.length).toBe(13);
    });
  });
});

// TODO: Write tests around errors
