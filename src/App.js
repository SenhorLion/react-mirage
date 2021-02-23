/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import * as React from 'react';
import { Router, Link } from '@reach/router';
import Home from './Home';
import Book from './Book';

import './app.css';

function App() {
  return (
    <div
      className="App"
      css={{
        display: 'flex',
        flexDirection: 'column',
        margin: '0',
        padding: '10px',
        width: '100vw',
        height: '100vh',
      }}
    >
      <header
        css={{
          display: 'flex',
          alignItems: 'center',
          height: '100px',
        }}
        aria-label="header"
      >
        <h1>
          <Link to="/">A book is just a Mirage</Link>
        </h1>
      </header>
      <Router>
        <Home path="/" />
        <Book path="/book/:id" />
      </Router>
    </div>
  );
}

export default App;
