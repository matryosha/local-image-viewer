import { pathNameToCurrentDirString } from '../Utils/currentDirTransform';

export default {
  handlers: [],
  init() {
    window.onpopstate = (e) => this.onPopStateHandler(e);
  },
  onPopStateHandler(e) {
    this.notifyHistoryChanged(e);
  },
  notifyHistoryChanged(event) {
    this.handlers.forEach((h) => {
      h(event.state?.path);
    });
  },
  subscribeToHistoryChanges(fn) {
    this.handlers.push(fn);
  },
  goTo(path, relative = false) {
    const urlToGo = relative ? path : `/${path}`;
    window.history.pushState({ path }, '', urlToGo);
  },
  goUp(path) {
    window.history.pushState(
      { path },
      '',
      path === '' ? '/' : `/../${path}`,
    );
  },
  goRoot() {
    window.history.pushState(
      { path: '' },
      '',
      '/',
    );
  },
  getCurrentDirPath() {
    return pathNameToCurrentDirString(window.location.pathname);
  },
};
