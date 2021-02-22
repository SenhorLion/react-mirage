/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import * as React from 'react';
import { useQuery } from 'react-query';
import { Router, Link } from "@reach/router"
import { getBook } from './api';
import { Container } from './components';
import './app.css';

// Book Data:
// author: "J. K. Rowling"
// coverImageUrl: "https://images-na.ssl-images-amazon.com/images/I/51IiQ4r35LL._SX345_BO1,204,203,200_.jpg"
// id: "439136369"
// pageCount: 448
// publisher: "Scholastic"
// synopsis: "In this third installment in the projected seven-volume series, Sirius Black, imprisoned for killing 13 people with one curse, escapes from Azkaban. As he heads for Hogwarts, the chilling Dementors who trail him quickly descend upon the school. "Each successive volume expands upon its predecessor with dizzyingly well-planned plots and inventive surprises," said PW in a Best Books of 2001 citation. Ages 8-up."
// title: "Harry Potter and the Prisoner of Azkaban"

function Book(props) {
  const { isLoading, isError, isSuccess, data, error } = useQuery(
    ['book', props.id],
    () => getBook({id: props.id})
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
        <span css={{color: 'red'}}><code>{error.message}</code></span>
      </Container>
    );
  }
  
  return (
    <>
      <Container>
          <h2>{data?.title}</h2>
          <h4>{data?.author}</h4>
          <p>{data?.synopsis}</p>
      </Container>
    </>
  );
}

export default Book;
