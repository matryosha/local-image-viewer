function openDir(currentDirString, newDirName) {
  if (currentDirString === '') {
    return newDirName;
  }
  return `${currentDirString}/${newDirName}`;
}

function dirUp(currentDirString) {
  if (currentDirString === '') return currentDirString;

  const lastSlashIndex = currentDirString.lastIndexOf('/');
  if (lastSlashIndex === -1) return currentDirString;

  return currentDirString.slice(0, lastSlashIndex - 1);
}

export {
  openDir,
  dirUp,
};
