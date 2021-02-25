/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
// import styled from '@emotion/styled';

// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { Link } from '@reach/router';
import { useQuery } from 'react-query';
import { getBooks } from './api';

import { Container, ShimmerDiv, shimmerAnimation,/*, Shimmer*/} from './components';
import './app.css';

const Shimmer = ({ size, title = false, subTitle = false }) => {
  return [...Array(size)].map((item) => (
    <ShimmerDiv
      css={css`
        animation: ${shimmerAnimation} 2s infinite linear;
        background: linear-gradient(
          to right,
          #eff1f3 4%,
          #e2e2e2 25%,
          #eff1f3 36%
        );
        background-size: 1000px 100%;
      `}
    ></ShimmerDiv>
  ));
};

function Home() {
  const { isLoading, isError, isSuccess, data, error } = useQuery('books', () =>
    getBooks({ error: false })
  );

  if (isLoading) {
    return (
      <Container>
        {/* <span>Loading...</span> */}
        <Container>
          <Shimmer size={5} />
        </Container>
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
