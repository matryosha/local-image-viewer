export default function compareItems(item1, item2) {
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
