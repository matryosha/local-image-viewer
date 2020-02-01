import './Components/Styles/normizile.css';
import ReactDOM from 'react-dom';
import React from 'react';
import GalleryService from './Services/galleryService';
import ApiService from './Services/api';
import RouterService from './Services/router';
import App from './App';

const apiService = ApiService;
const galleryService = GalleryService();
const routerService = RouterService;

const services = {
  apiService,
  galleryService,
  routerService,
};

ReactDOM.render(
  React.createElement(App, { services }, null),
  document.getElementById('root'),
);
