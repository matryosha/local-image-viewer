import 'photoswipe/dist/default-skin/default-skin.css';
import 'photoswipe/dist/photoswipe.css';
import ReactDOM from 'react-dom';
import React from 'react';
import './Components/Styles/normizile.css';
import * as MockApi from './Services/api.mock';

import App from './App';

const apiService = MockApi.successfulApi();

const services = {
  apiService,
};

ReactDOM.render(
  React.createElement(App, { services }, null),
  document.getElementById('root'),
);
