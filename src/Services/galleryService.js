/* eslint-disable no-param-reassign,func-names,camelcase */
import 'photoswipe/dist/default-skin/default-skin.css';
import 'photoswipe/dist/photoswipe.css';
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

export default () => ({
  open(items, imageIndex) {
    const pswpElement = document.querySelectorAll('.pswp')[0];

    const options = {
      index: imageIndex,
    };

    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

    gallery.listen('gettingData', (index, item) => {
      if (item.w < 1 || item.h < 1) {
        const img = new Image();
        img.onload = function () {
          item.w = this.width;
          item.h = this.height;
          item.needsUpdate = true; // only update the newly loaded item
          gallery.updateSize(true);
        };
        img.src = item.src;
      }
    });
    gallery.init();
  },
});
