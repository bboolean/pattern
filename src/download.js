/**
 * Download a pattern image.
 * @param {Object} item A pattern image object.
 * @param {string} item.name The name of the pattern image.
 * @param {string} src The image src.
 * @returns {React.ReactElement} The cat.
 */
export const download = (item, src) => {
  const image = document.createElement('a');
  image.href = src;
  image.download =
    item.name.replace(/[^a-zA-Z0-9]/g, '_') + '.png';
  document.body.appendChild(image);
  image.click();
  document.body.removeChild(image);
};
