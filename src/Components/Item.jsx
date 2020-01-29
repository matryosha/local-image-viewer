import React from 'react';
import './Styles/item.sass';


export default function Item(props) {
  const { onClick, isFile, name } = props;
  const fileSvg = (
    <svg width="45" height="41" viewBox="0 0 34 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26.1558 7.78125L21.4805 3.15625L23.2786 9.91546C23.3713 10.2638 23.6442 10.5353 23.9931 10.6261L30.8312 12.4062L26.1558 7.78125Z"
        fill="#FAFAFA"
      />
      <path
        d="M21.4805 3.15625L26.1558 7.78125L30.8312 12.4062M21.4805 3.15625L20.6039 2.28908C20.4167 2.10388 20.164 2 19.9006 2H17H4C2.89543 2 2 2.89543 2 4V37C2 38.1046 2.89543 39 4 39H30C31.1046 39 32 38.1046 32 37V16.8385V13.9799C32 13.7128 31.8932 13.4568 31.7033 13.269L30.8312 12.4062M21.4805 3.15625L23.2786 9.91546C23.3713 10.2638 23.6442 10.5353 23.9931 10.6261L30.8312 12.4062"
        stroke="#FAFAFA"
        strokeWidth="3"
      />
    </svg>
  );
  const folderSvg = (
    <svg width="45" height="41" viewBox="0 0 45 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 34V10V4C2 2.89543 2.89543 2 4 2H14.5C15.6046 2 16.5 2.89543 16.5 4V9C16.5 9.55228 16.9477 10 17.5 10H32H38C40.7614 10 43 12.2386 43 15V34C43 36.7614 40.7614 39 38 39H7C4.23858 39 2 36.7614 2 34Z" stroke="#FAFAFA" strokeWidth="3" />
    </svg>
  );
  const fileTypeIcon = isFile ? fileSvg : folderSvg;
  const boxClassName = `item ${isFile ? 'item-file-bg' : 'item-folder-bg'}`;

  return (
    <div className={boxClassName} onClick={onClick}>
      <div className="item-file-type-box">
        {fileTypeIcon}
      </div>
      <div className="item-name">
        <p>{name}</p>
      </div>
    </div>
  );
}
