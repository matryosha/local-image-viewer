/**
 * Used as compare function in filter items methods.
 * Orders items in such way: All items will be sorted alphabetical with folder at top.
 */
function compareItems(item1, item2) {
  if (item1.isFile && !item2.isFile) {
    return 1;
  }

  if (!item1.isFile && item2.isFile) {
    return -1;
  }

  if ((item1.isFile && item2.isFile) || (!item1.isFile && !item2.isFile)) {
    if (item1.name > item2.name) {
      return 1;
    }
    return -1;
  }
  return 0;
}

function transformToRelImageUrl(item, currentDirString, getImageEndpoint) {
  if (currentDirString === '') return `${getImageEndpoint}/${currentDirString}${item.name}`;
  return `${getImageEndpoint}/${currentDirString}/${item.name}`;
}

function createGalleryItemList(currentDirString, dirItems, apiService) {
  const { getImageEndpoint } = apiService;
  const currentDirFilesOnly = dirItems.filter((i) => i.isFile);

  const filesWithRelativeUrl = currentDirFilesOnly
    .map((item) => transformToRelImageUrl(item, currentDirString, getImageEndpoint));

  return filesWithRelativeUrl.map((f) => ({ src: f, w: -1, h: -1 }));
}

export {
  compareItems,
  createGalleryItemList,
};
