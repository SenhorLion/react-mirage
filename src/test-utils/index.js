import { render } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router';

/**
 * Creates a QueryClient to use in tests
 * Pass in a retyr value to override for the react-query useQuery
 * TODO: if we need more options consider using lodash to merge
 * config options object (as it is a nested object)
 *
 * @method createQueryClient
 * @param {*} options
 */
export const createQueryClient = ({ retry = false } = {}) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry, // false will disable retry in tests
      },
    },
  });
};

/**
 * Reach Router Util
 * this is a handy function to utilize for any component
 * that relies on the router being in context
 * It also wraps the react query client provider
 * Allows to override useQuery options in your tests
 *
 * @method renderWithRouter
 * @param {*} ui
 * @param {*} options
 */
export async function renderWithRouter(
  ui,
  {
    route = '/',
    history = createHistory(createMemorySource(route)),
    queryClient = createQueryClient(),
  } = {}
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
