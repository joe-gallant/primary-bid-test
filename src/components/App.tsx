import React, { FunctionComponent } from 'react';
import { AppWrapper } from 'components';
import { Routing } from 'pages/routes';

const App: FunctionComponent = () => {
  return (
    <>
      <AppWrapper>
        <Routing />
      </AppWrapper>
    </>
  );
};

export default App;
