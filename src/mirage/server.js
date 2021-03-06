import {
  createServer,
  Model,
  JSONAPISerializer,
  RestSerializer,
  Response,
} from 'miragejs';

// import { sharedScenario } from './shared.scenario'
import books from '../data/books.json';

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      book: Model,
    },

    fixtures: {
      books,
    },

    serializers: {
      application: RestSerializer, // the default
      // application: JSONAPISerializer,
    },

    seeds(server) {
      server.loadFixtures();
      // sharedScenario(server);
      server.create('user', { name: 'Lionel', role: 'admin' });
    },

    routes() {
      this.namespace = 'api';
      // this.routes = 2000;
      this.timing = 1000;

      // this.get('/users', ({users}) => {
      //   return users.all();
      // });
      // The shorthand version
      this.get('users');

      // this.get('/books', (schema, request) => {
      //   return schema.books.all()
      //   // return schema.db.books
      // });

      // The shorthand version
      this.get('/books');

      this.get(
        '/books/:id',
        ({ books }, request) => {
          const id = request.params.id;
          const book = books.find(id);

          // Enable a error case by passing in the "ERROR" string as id
          // With this, we can simulate a typical Network error scenario,
          if (id === 'ERROR') {
            // const { status, error } =
            //   Math.random() > 0.5
            //     ? { status: 404, error: `Item not found` }
            //     : { status: 500, error: 'Error occured retrieving data' };
            const { status, error } = { status: 500, error: `A network error occured, please try again` }
            return new Response(status, {}, { error });
          }

          if(!book) {
            const { status, error } = { status: 404, error: `Item not found` }
            return new Response(status, {}, { error });
          }
          return book;
        },
        { timing: 100 }
      );
      // Shorthand version
      // this.get('/books/:id');
    },
  });

  return server;
}
