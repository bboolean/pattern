export const download = (item, src) => {
  const image = document.createElement('a');
  image.href = src;
  image.download =
    item.name.replace(/[^a-zA-Z0-9]/g, '_') + '.png';
  document.body.appendChild(image);
  image.click();
  document.body.removeChild(image);
};
