import Axios from 'axios';

const serverApiEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
const getImageEndpoint = `${serverApiEndpoint}/get-image`;
const getDirItemsEndPoint = (relDirPath) => `${serverApiEndpoint}/get-dir-content/${relDirPath}`;

function Api() {
  this.fetchDirItems = async (relDirPath) => {
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
  };
}

Api.prototype.serverApiEndpoint = serverApiEndpoint;
Api.prototype.getImageEndpoint = getImageEndpoint;
Api.prototype.getDirItemsEndPoint = getDirItemsEndPoint;

export default new Api();
