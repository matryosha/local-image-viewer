import React from 'react';
import ButtonBase from './ButtonBase';
import './Styles/button-root.sass';

export default function RootButton(props) {
  const { onClick } = props;
  return (
    <ButtonBase onClick={async () => onClick()}>
      <div className="btn-root">
        <svg width="20" height="35" viewBox="0 0 20 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 34L18 1" stroke="#8036A3" strokeWidth="4" />
        </svg>
      </div>
    </ButtonBase>
  );
}
