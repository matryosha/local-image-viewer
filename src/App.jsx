import React from 'react';
import FolderUpButton from './Components/FolderUpButton';
import RootButton from './Components/RootButton';
import Item from './Components/Item';
import './Components/Styles/main.sass';
import compareItems from './Utils/common';
import * as CurrentDirTransform from './Utils/currentDirTransform';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { services } = this.props;
    const { apiService, galleryService } = services;
    this.apiService = apiService;
    this.galleryService = galleryService;

    this.state = { items: [], currentDir: '' };
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
    const { getImageEndpoint } = this.apiService;

    const currentDirFilesOnly = items.filter((i) => i.isFile);
    const filesWithRelativeUrl = currentDirFilesOnly.map((f) => `${getImageEndpoint}/${currentDir}${f.name}`);

    this.galleryService.open(filesWithRelativeUrl.map((f) => ({ src: f, w: -1, h: -1 })));
  }

  async handleFolderClicked(folderName) {
    const { currentDir } = this.state;

    const updatedCurrentDir = CurrentDirTransform.openDir(currentDir, folderName);
    const newItems = await this.apiService.fetchDirItems(updatedCurrentDir);

    this.setState(() => (
      { currentDir: updatedCurrentDir, items: newItems.items.sort(compareItems) }));
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
          <FolderUpButton />
          <RootButton />
        </div>
        <div id="items">
          {itemsToRender}
        </div>
      </>
    );
  }
}
