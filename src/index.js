import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './styles/style';
import Normalize from './styles/normalize';
import App from './components/App.tsx';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
    <Normalize />
  </React.StrictMode>,
  document.getElementById('root'),
);
