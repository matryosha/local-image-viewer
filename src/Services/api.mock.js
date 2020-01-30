function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getStubItems() {
  return JSON.parse('[{"isFile":true,"name":"image-super.jpg"},{"isFile":true,"name":"fs_images.jpg"},{"isFile":false,"name":"instance"},{"isFile":true,"name":"start.jpg"},{"isFile":true,"name":"test-image.jpg"},{"isFile":false,"name":"venv"},{"isFile":false,"name":"web_flask"},{"isFile":false,"name":"__pycache__"}]\n');
}


export function successfulApi() {
  return {
    async fetchDirItems(dirRelPath) {
      await sleep(100);
      return {
        ok: true,
        items: getStubItems(),
      };
    },
  };
}

export function failApi() {
  return {
    async fetchDirItems() {
      await sleep(200);
      return {
        ok: false,
        items: [],
        errorMessage: 'Some error message',
      };
    },
  };
}
