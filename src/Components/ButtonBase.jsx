import React from 'react';
import './Styles/button-base.sass';


export default function ButtonBase(props) {
  const { children, onClick, styleClassNames } = props;
  const classNames = `btn-base ${styleClassNames !== undefined ? styleClassNames : ''}`;
  return (
    <div className={classNames} onClick={async () => onClick()}>
      {children}
    </div>
  );
}
