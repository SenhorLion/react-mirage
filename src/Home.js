/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
// import styled from '@emotion/styled';

// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { Link } from '@reach/router';
import { useQuery } from 'react-query';
import { getBooks } from './api';

import { Container } from './components';
import './app.css';

function Home() {
  const { isLoading, isError, isSuccess, data, error } = useQuery('books', () =>
    getBooks({ error: false })
  );

  if (isLoading) {
    return (
      <Container>
        <span>Loading...</span>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <span css={{ color: 'red' }}>
          <code>Error: {error.message}</code>
        </span>
      </Container>
    );
  }

  return (
    <>
      <Container>
        {data && (
          <>
            <h2>Books:</h2>
            <ul aria-label="books">
              {data?.map((book) => (
                <li key={book.id}>
                  <Link to={`/book/${book.id}`}>{book.title}</Link>
                </li>
              ))}
              <li key="error-xyz">
                <Link to={`/book/ERROR`}>Network Error test</Link>
              </li>
              <li key="error-not-found">
                <Link to={`/book/NO-BOOK`}>Book not found Error test</Link>
              </li>
            </ul>
          </>
        )}
      </Container>
    </>
  );
}

export default Home;
