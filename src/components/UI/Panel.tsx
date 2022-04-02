import styled from 'styled-components';

export const Panel = styled.div`
  font-size: 0.8rem;
  border: 1px solid #ccc;
  background: #ffffff;
  min-height: 240px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  transition: all ease 0.2s;
  border-radius: 4px;
  margin-bottom: 2rem;
  padding: 2rem 1rem 1rem;
  flex-direction: column;

  img {
    width: auto;
    height: 80px;
    margin-bottom: 1rem;
  }
`;
