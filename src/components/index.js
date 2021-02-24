import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const Container = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
});

export const shimmer = keyframes`
 0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }`;

export const ShimmerDiv = styled.div({
  flex: 1,
  height: '10px',
  width: '80%',
  padding: '8px',
  marginBottom: '6px',
  background: '#777',
});
