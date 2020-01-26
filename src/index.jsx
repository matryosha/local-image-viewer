import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/default-skin/default-skin.css'
import 'photoswipe/dist/photoswipe.css'
import ReactDOM from 'react-dom'
import React from 'react'

var pswpElement = document.querySelectorAll('.pswp')[0];

// build items array
var items = [
    {
        src: 'https://placekitten.com/600/400',
        w: 600,
        h: 400
    },
    {
        src: 'https://placekitten.com/1200/900',
        w: 1200,
        h: 900
    }
];

//

fetch('http://localhost:5000/get-current-dir-image-names-recursively')
    .then(r => r.json())
    .then(j => {
        const images = j.map(imageName => {
            return {
                src: `http://localhost:5000/get-image/${imageName}`,
                w: 0,
                h: 0
            }
        });

        // define options (if needed)
        const options = {
            // optionName: 'option value'
            // for example:
            index: 0 // start at first slide
        };

        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, images, options);

        gallery.listen('gettingData', function (index, item) {
            if (item.w < 1 || item.h < 1) { // unknown size
                const img = new Image();
                img.onload = function () { // will get size after load
                    item.w = this.width; // set image width
                    item.h = this.height; // set image height
                    gallery.updateSize(true);
                };
                img.src = item.src; // let's download image
            }
        });

        // Initializes and opens PhotoSwipe
        gallery.init();
    });

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);



