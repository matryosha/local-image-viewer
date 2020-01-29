import Axios from 'axios';

const serverApiEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
const imageNamesInCurrentDirEndpoint = `${serverApiEndpoint}/get-current-dir-image-names`;
const imageNamesInCurrentDirRecursivelyEndpoint = `${serverApiEndpoint}/get-current-dir-image-names-recursively`;
const currentDirItemsEndpoint = `${serverApiEndpoint}/get-current-dir-items`;
const currentDirEndpoint = `${serverApiEndpoint}/get-current-dir`;

export default () => ({
  async fetchCurrentDirItems() {
    let result;
    try {
      const fetchResult = await Axios.get(currentDirItemsEndpoint);
      result = {
        ok: true,
        items: fetchResult.data,
      };
    } catch (e) {
      result = {
        ok: false,
        errorMessage: e,
        items: [],
      };
    }
    return result;
  },
  async fetchCurrentDir() {
    let result;
    try {
      const fetchResult = await Axios.get(currentDirEndpoint);
      result = {
        ok: true,
        currentDir: fetchResult,
      };
    } catch (e) {
      result = {
        ok: false,
        errorMessage: e,
      };
    }
    return result;
  },
});
