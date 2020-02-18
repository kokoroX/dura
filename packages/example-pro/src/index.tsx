import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './container/Home';

render(
  <div>
    <Provider store={store}>
      <Home />
    </Provider>
  </div>,
  document.querySelector('#root')
);
