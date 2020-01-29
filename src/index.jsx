import PhotoSwipe from 'photoswipe/dist/photoswipe';
import { PhotoSwipeUI_Default as PhotoSwipeUIDefault } from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/default-skin/default-skin.css';
import 'photoswipe/dist/photoswipe.css';
import ReactDOM from 'react-dom';
import React from 'react';
import './Components/Styles/normizile.css';

import App from './App';

const pswpElement = document.querySelectorAll('.pswp')[0];

// build items array
const items = [
  {
    src: 'https://placekitten.com/600/400',
    w: 600,
    h: 400,
  },
  {
    src: 'https://placekitten.com/1200/900',
    w: 1200,
    h: 900,
  },
];

//

fetch('http://localhost:5000/get-current-dir-image-names-recursively')
  .then((r) => r.json())
  .then((j) => {
    const images = j.map((imageName) => ({
      src: `http://localhost:5000/get-image/${imageName}`,
      w: 0,
      h: 0,
    }));

    // define options (if needed)
    const options = {
      // optionName: 'option value'
      // for example:
      index: 0, // start at first slide
    };

    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIDefault, items, options);

    gallery.listen('gettingData', (index, item) => {
      const image = item;
      if (image.w < 1 || image.h < 1) { // unknown size
        const img = new Image();
        img.onload = () => { // will get size after load
          image.w = this.width; // set image width
          image.h = this.height; // set image height
          gallery.updateSize(true);
        };
        img.src = item.src; // let's download image
      }
    });

    // Initializes and opens PhotoSwipe
    gallery.init();
  });

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
