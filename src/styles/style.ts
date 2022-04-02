import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    color: #0D1321;
  }

  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: #0D1321;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }

    &:visited {
      color: #0D1321;
    }
  }
`;

export default GlobalStyle;
