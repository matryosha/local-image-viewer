import Axios from 'axios';

export const serverApiEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
export const getImageEndpoint = `${serverApiEndpoint}/get-image`;
export const getDirItemsEndPoint = (relDirPath) => `${serverApiEndpoint}/get-dir-content/${relDirPath}`;

export default () => ({
  async fetchDirItems(relDirPath) {
    let result;
    try {
      const fetchResult = await Axios.get(getDirItemsEndPoint(relDirPath));
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
});
