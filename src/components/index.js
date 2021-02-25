import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

export const Container = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
});

export const shimmerAnimation = keyframes`
 0% {
    background-position: -1000px 0;
  }
 100% {
    background-position: 1000px 0;
  }`;

export const ShimmerDiv = styled.div({
  flex: 1,
  height: '10px',
  width: '60%',
  padding: '8px',
  marginBottom: '6px',
  background: '#ddd',
});

// NB: Animation in this component doesnt work
// when imported in a component
export const Shimmer = ({ size, title = false, subTitle = false }) => {
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
