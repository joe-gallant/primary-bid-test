import styled from 'styled-components';

export const Button = styled.button<{ primary?: boolean; disabled?: boolean }>`
  padding: 0.8rem 1rem;
  margin: 0;
  cursor: pointer;
  border: 1px solid #ccc;
  appearance: none;
  background: ${({ primary }): string => (primary ? '#53adb4' : '#f3f3f3')};
  border-radius: 4px;
  color: ${({ primary }): string => (primary ? '#ffffff' : '#000')};
  opacity: ${({ disabled }): string => (disabled ? '0.5' : '1')};

  &:hover {
    background: ${({ primary }): string => (primary ? '#66ced6' : '#eeeeee')};
  }
`;
