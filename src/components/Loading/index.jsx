import React from 'react';
import { Box, BoxProps } from 'grommet';
import styled from 'styled-components';
import { ColorType } from 'grommet/utils';

const Dot = styled(Box)`
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
`;

const Wrapper = styled(Box)`
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  ${Dot}:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  ${Dot}:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  ${Dot}:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  ${Dot}:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
`;

function Loading({
  dotColor = 'dark-3',
  ...rest
}: BoxProps & { dotColor?: ColorType }) {
  return (
    <Wrapper {...rest}>
      <Dot background={dotColor}></Dot>
      <Dot background={dotColor}></Dot>
      <Dot background={dotColor}></Dot>
      <Dot background={dotColor}></Dot>
    </Wrapper>
  );
}

export default Loading;
