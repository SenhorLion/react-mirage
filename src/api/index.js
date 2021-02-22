/**
 * Transform books data from JSONAPI into a useable object
 * E.g:
 * {
  "data": {
    "id": "1",
    "type": "books",
    "attributes": {
      "title": "Interstellar"
    },
  }
 * @param {object} data 
 * @return {object}
 */
const transformJSONBook = (book) => ({
  id: book.id,
  ...book.attributes,
});

const searializeJSONBooks = ({data}) => {
  return data?.map((book) => transformJSONBook(book));
};

const transformRESTBook = ({book}) => ({
  ...book,
});
const searializeRESTBooks = ({ books }) => {
  return books?.map((book) => book);
};

export const getBooks = async ({ endpoint = '/api', error = false }) => {
  try {
    if (error) {
      throw new Error('Network response was not ok');
    }
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT ?? endpoint;

    const res = await fetch(`${apiEndpoint}/books`);
    const data = await res.json();

    console.log('BOOKS :: ', data);
    // transform books
    // debugger
    // If using JSONAPI, we need to serealize the data
    // return searializeJSONBooks(data);
    return searializeRESTBooks(data);
  } catch (error) {
    throw error;
  }
};

export const getBook = async ({ endpoint = '/api', id, error = false }) => {
  try {
    if (error) {
      throw new Error('Network response was not ok');
    }
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT ?? endpoint;
    const res = await fetch(`${apiEndpoint}/books/${id}`);
    const data = await res.json();

    console.log('DATA', data);

    const book = { ...data };

    console.log('=> BOOK', book);

    if (data.error) {
      throw Error(data.error);
    }

    // If using JSONAPI, we need to serealize the data
    // return transformJSONBook(data?.data);
    return transformRESTBook(data);
  } catch (error) {
    throw error;
  }
};
