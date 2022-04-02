import styled from 'styled-components';

export const Price = styled.div<{ small?: boolean }>`
  font-size: ${({ small }): string => (small ? '1.2rem' : '2rem')};
  color: #66ced6;
  font-weight: 800;
`;
