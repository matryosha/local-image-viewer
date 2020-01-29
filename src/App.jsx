import React from 'react';
import FolderUpButton from './Components/FolderUpButton';
import RootButton from './Components/RootButton';
import Item from './Components/Item';
import './Components/Styles/main.sass';
import compareItems from './Utils/common';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { services } = this.props;
    const { apiService } = services;
    this.apiService = apiService;

    this.state = { items: [] };
  }

  async componentDidMount() {
    const fetchResult = await this.apiService.fetchCurrentDirItems();
    this.setState(() => ({ items: fetchResult.items.sort(compareItems) }));
  }

  render() {
    const { items } = this.state;
    const itemsToRender = items.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Item isFile={item.isFile} name={item.name} key={index} />));

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
