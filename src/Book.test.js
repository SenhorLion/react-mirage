import {
  act,
  render,
  screen,
  // finByText,
  waitFor,
  // waitForElementToBeRemoved,
} from '@testing-library/react';
// import { act } from '@testing-library/react-hooks';
import { QueryClientProvider, QueryClient } from 'react-query';

import { makeServer } from './mirage/server';
// import { sharedScenario } from './mirage/shared.scenario';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // disable retry in tests
    },
  },
});

// Reach Router Util
// this is a handy function to utilize for any component
// that relies on the router being in context
async function renderWithRouter(
  ui,
  { route = '/', history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <LocationProvider history={history}>{ui}</LocationProvider>
      </QueryClientProvider>
    ),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}
// NB: Use the 'renderWithRouter' helper above
// it better handles the way the actual components are used
// - left here as a reminder -
// const Wrapped = ({ children }) => (
//   <QueryClientProvider client={queryClient}>
//     <LocationProvider history={createHistory(createMemorySource('/'))}>
//       {children}
//     </LocationProvider>
//   </QueryClientProvider>
// );

let server;

beforeEach(() => {
  server = makeServer({ environment: 'test' });
  // sharedScenario(server);
  // NB: SharedScenario
});

afterEach(() => {
  server.shutdown();
});

// const sharedBookProps = {
//   id: '618645616',
//   path: '/book/:id',
//   uri: '/book/618645616',
// };

describe('Render Book page', () => {
  it('shows loading message', async () => {
    // render(
    //   <Wrapped>
    //     <Book {...sharedBookProps} />
    //   </Wrapped>
    // );
    renderWithRouter(<App />, {
      route: '/book/618645616',
    });

    const loader = screen.getByText(/loading.../i);

    expect(loader).toBeInTheDocument();
  });

  it('displays book for given id', async () => {
    // Create a book for our tests.
    // As the `sharedScenario` doesnt seem to work,
    // this will make sure our tests still work if the
    // books.json data changes
    server.create('book', {
      title: 'My Made up Book',
      author: 'Testy Tester',
      coverImageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/4186P0mACWL._SX336_BO1,204,203,200_.jpg',
      id: '121212',
      pageCount: 96,
      publisher: 'Nobody Books',
      synopsis:
        "Few stories are as widely read and as universally cherished by children and adults alike as The Little Prince. Richard Howard's translation of the beloved classic beautifully reflects Saint-Exupéry's unique and gifted style. Howard, an acclaimed poet and one of the preeminent translators of our time, has excelled in bringing the English text as close as possible to the French, in language, style, and most important, spirit. The artwork in this edition has been restored to match in detail and in color Saint-Exupéry's original artwork. Combining Richard Howard's translation with restored original art, this definitive English-language edition of The Little Prince will capture the hearts of readers of all ages.",
    });

    // const { container } = renderWithRouter(<App />, {
    //   route: '/book/121212',
    // });

    renderWithRouter(<App />, {
      route: '/book/121212',
    });

    // // We must waitFor the list to load
    await waitFor(async () => {
      const title = screen.getByRole('heading', {
        name: /my made up book/i,
      });
      const subTitle = screen.getByRole('heading', {
        name: /testy tester/i,
      });

      expect(title).toBeInTheDocument();
      expect(subTitle).toBeInTheDocument();
    });
  });
});

describe('Handles Errors', () => {
  it('displays error when no book found for given id', async () => {
    await renderWithRouter(<App />, {
      route: '/book/ERROR',
    });

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    // screen.debug();

    // We must waitFor the list to load
    await waitFor(async () => {
      const errorMessage = screen.getByText(/item not found/i);

      screen.debug();
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
