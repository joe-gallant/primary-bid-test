import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #cccccc;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: ${spin} 0.5s linear infinite;
`;
