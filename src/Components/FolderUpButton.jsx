import React from 'react';
import ButtonBase from './ButtonBase';
import './Styles/button-folder-up.sass';

export default function ButtonFolderUp(props) {
  const { onClick } = props;
  return (
    <ButtonBase onClick={async () => onClick()}>
      <div className="btn-folder-up">
        <svg width="20" height="37" viewBox="0 0 20 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 2L10.5 10.25L3 18.5L18 35" stroke="#357BA3" strokeWidth="4" />
        </svg>
      </div>
    </ButtonBase>
  );
}
