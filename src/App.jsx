import React from 'react';
import FolderUpButton from './Components/FolderUpButton';
import RootButton from './Components/RootButton';
import Item from './Components/Item';
import './Components/Styles/main.sass';
import { compareItems, createGalleryItemList } from './Utils/common';
import * as CurrentDirTransform from './Utils/currentDirTransform';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { services } = this.props;
    const { apiService, galleryService, routerService } = services;
    this.apiService = apiService;
    this.galleryService = galleryService;
    this.router = routerService;

    this.router.init();
    this.router.subscribeToHistoryChanges(this.handleHistoryChange.bind(this));
    this.state = { items: [], currentDir: this.router.getCurrentDirPath() };
  }

  async componentDidMount() {
    const { currentDir } = this.state;
    const fetchResult = await this.apiService.fetchDirItems(currentDir);
    this.setState(() => ({ items: fetchResult.items.sort(compareItems) }));
  }

  async itemClicked(itemName, isFile) {
    if (isFile) return this.handleFileClicked(itemName);
    return this.handleFolderClicked(itemName);
  }

  async handleFileClicked(itemName) {
    const { items, currentDir } = this.state;
    const galleryItems = createGalleryItemList(currentDir, items, this.apiService);
    this.galleryService.open(galleryItems);
  }

  async handleFolderClicked(folderName) {
    const { currentDir } = this.state;

    const updatedCurrentDir = CurrentDirTransform.openDir(currentDir, folderName);
    this.router.goTo(updatedCurrentDir);
    const newItems = await this.apiService.fetchDirItems(updatedCurrentDir);

    this.setState(() => (
      { currentDir: updatedCurrentDir, items: newItems.items.sort(compareItems) }));
  }

  async handleFolderUpClicked() {
    const { currentDir } = this.state;
    const updatedCurrentDir = CurrentDirTransform.dirUp(currentDir);
    if (currentDir === updatedCurrentDir) return;
    const newItems = await this.apiService.fetchDirItems(updatedCurrentDir);
    this.router.goUp(updatedCurrentDir);
    this.setState(() => (
      { currentDir: updatedCurrentDir, items: newItems.items.sort(compareItems) }));
  }

  async handleHistoryChange(updatedPath) {
    const currentDir = updatedPath === undefined ? '' : updatedPath;

    const { currentDir: stateCurrentDir } = this.state;
    if (currentDir === stateCurrentDir) return;
    const fetchedItems = await this.apiService.fetchDirItems(currentDir);

    this.setState(() => (
      { currentDir, items: fetchedItems.items.sort(compareItems) }));
  }

  render() {
    const { items } = this.state;
    const itemsToRender = items.map((item, index) => (
      <Item
        isFile={item.isFile}
        name={item.name}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        onClick={async (itemName, isFile) => this.itemClicked(itemName, isFile)}
      />
    ));

    return (
      <>
        <div id="control-buttons">
          <FolderUpButton onClick={async () => this.handleFolderUpClicked()} />
          <RootButton />
        </div>
        <div id="items">
          {itemsToRender}
        </div>
      </>
    );
  }
}
