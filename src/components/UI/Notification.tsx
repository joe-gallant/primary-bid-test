import styled from 'styled-components';

export const Notification = styled.div<{ type?: string }>`
  padding: 1rem;
  border-left: 1px solid
    ${({ type }): string => (type == 'success' ? 'green' : 'red')};
  background: ${({ type }): string =>
    type == 'success' ? '#d9f5dc' : '#ffcccb'};
  margin-bottom: 2rem;
`;
