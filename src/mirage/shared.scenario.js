
// import books from '../data/books.json';

// NB: Using this across development AND tests doesnt work,
// the tests complain that the data ids have already been used?
export const sharedScenario = function(server) {
  server.loadFixtures('books');
};
