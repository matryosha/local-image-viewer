import './Components/Styles/normizile.css';
import ReactDOM from 'react-dom';
import React from 'react';
import GalleryService from './Services/galleryService';
import ApiService from './Services/api';
import App from './App';

const apiService = ApiService();
const galleryService = GalleryService();

const services = {
  apiService,
  galleryService,
};

ReactDOM.render(
  React.createElement(App, { services }, null),
  document.getElementById('root'),
);
