import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from './ui/App';
// import registerServiceWorker from './registerServiceWorker';

import { authenticate } from  './authentication'

authenticate()
  .then(() => {
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      document.getElementById('root') as HTMLElement
    )
  })

// registerServiceWorker();
