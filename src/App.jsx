import React from 'react';
import FolderUpButton from './Components/FolderUpButton';
import RootButton from './Components/RootButton';
import Item from './Components/Item';

import './Components/Styles/main.sass';

export default function App() {
  return (
    <>
      <div id="control-buttons">
        <FolderUpButton />
        <RootButton />
      </div>
      <div id="items">
        <Item />
      </div>
    </>
  );
}
