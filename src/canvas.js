/**
 * Convert hsl to hex (e.g. hsl(0 0% 100%) to #ffffff)
 * @param {number} h The hue (0-360)
 * @param {number} s The saturation (0-100)
 * @param {number} l The lightness (0-100)
 * @returns {string} E.g. '#ffffff'
 */
const hslToHex = (h, s, l) => {
  l /= 100;

  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color =
      l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const w = 10 * 2 ** 5;
export const h = 10 * 2 ** 5;

/**
 * The "Pixel" shape that is to be placed multiple times by drawShapes()
 * @param {CanvasRenderingContext2D} ctx The canvas context.
 * @param {number} offsetx The x offset to place the shape.
 * @param {number} offsety The y offset to place the shape.
 */
const pixel = (ctx, offsetx, offsety) => {
  ctx.fillRect(offsetx, offsety + 4 * 10, 10, 10);
  ctx.fillRect(offsetx, offsety + 8 * 10, 10, 10);
  ctx.fillRect(offsetx + 4 * 10, offsety + 4 * 10, 10, 10);
  ctx.fillRect(offsetx + 4 * 10, offsety + 8 * 10, 10, 10);
};

/**
 * The "Square" shape that is to be placed multiple times by drawShapes()
 * @param {CanvasRenderingContext2D} ctx The canvas context.
 * @param {number} offsetx The x offset to place the shape.
 * @param {number} offsety The y offset to place the shape.
 */
const square = (ctx, offsetx, offsety) => {
  for (let y = -3; y <= 3; y++) {
    ctx.fillRect(
      offsetx - 3 * 10,
      offsety + y * 10,
      10,
      10
    );
    ctx.fillRect(
      offsetx + 3 * 10,
      offsety + y * 10,
      10,
      10
    );
  }
  for (let x = -3; x <= 3; x++) {
    ctx.fillRect(
      offsetx + x * 10,
      offsety - 3 * 10,
      10,
      10
    );
    ctx.fillRect(
      offsetx + x * 10,
      offsety + 3 * 10,
      10,
      10
    );
  }
};

/**
 * The "Plus" shape that is to be placed multiple times by drawShapes()
 * @param {CanvasRenderingContext2D} ctx The canvas context.
 * @param {number} offsetx The x offset to place the shape.
 * @param {number} offsety The y offset to place the shape.
 */
const plus = (ctx, offsetx, offsety) => {
  for (let y = -2; y <= 2; y++) {
    ctx.fillRect(
      offsetx - 3 * 10,
      offsety + y * 10,
      10,
      10
    );
    ctx.fillRect(
      offsetx + 3 * 10,
      offsety + y * 10,
      10,
      10
    );
  }
  for (let x = -2; x <= 2; x++) {
    ctx.fillRect(
      offsetx + x * 10,
      offsety - 3 * 10,
      10,
      10
    );
    ctx.fillRect(
      offsetx + x * 10,
      offsety + 3 * 10,
      10,
      10
    );
  }
  ctx.fillRect(offsetx - 2 * 10, offsety + 2 * 10, 10, 10);
  ctx.fillRect(offsetx + 2 * 10, offsety - 2 * 10, 10, 10);
  ctx.fillRect(offsetx - 2 * 10, offsety - 2 * 10, 10, 10);
  ctx.fillRect(offsetx + 2 * 10, offsety + 2 * 10, 10, 10);
};

/**
 * The "Diamond" shape that is to be placed multiple times by drawShapes()
 * @param {CanvasRenderingContext2D} ctx The canvas context.
 * @param {number} offsetx The x offset to place the shape.
 * @param {number} offsety The y offset to place the shape.
 */
const diamond = (ctx, offsetx, offsety) => {
  const internalOffsetY = 3 * 10;
  for (let y = 0; y <= 2; y++) {
    ctx.fillRect(
      offsetx - 2 * 10 + y * 10,
      offsety + y * 10 + 1 * 10 + internalOffsetY,
      10,
      10
    );
    ctx.fillRect(
      offsetx + 2 * 10 - y * 10,
      offsety + y * 10 + 1 * 10 + internalOffsetY,
      10,
      10
    );
    ctx.fillRect(
      offsetx - 2 * 10 + y * 10,
      offsety + y * 10 + 1 * 10 + internalOffsetY,
      10,
      10
    );
    ctx.fillRect(
      offsetx - y * 10,
      offsety + y * 10 - 1 * 10 + internalOffsetY,
      10,
      10
    );
    ctx.fillRect(
      offsetx + y * 10,
      offsety + y * 10 - 1 * 10 + internalOffsetY,
      10,
      10
    );
  }
  for (let y = 0; y <= 2; y++) {
    ctx.fillRect(
      offsetx - 2 * 10 + y * 10,
      offsety + y * 10 + 2 * 10 + internalOffsetY,
      10,
      10
    );
    ctx.fillRect(
      offsetx + 3 * 10 - y * 10,
      offsety + y * 10 + 1 * 10 + internalOffsetY,
      10,
      10
    );
    ctx.fillRect(
      offsetx + 1 * 10 + y * 10,
      offsety + y * 10 - 1 * 10 + internalOffsetY,
      10,
      10
    );
    ctx.fillRect(
      offsetx - y * 10,
      offsety + y * 10 - 2 * 10 + internalOffsetY,
      10,
      10
    );
  }
  ctx.fillRect(
    offsetx - 3 * 10,
    offsety + 1 * 10 + internalOffsetY,
    10,
    10
  );
};

// All the possible shapes for a pattern image.
const shapes = {
  Plus: plus,
  Diamond: diamond,
  Square: square,
  Pixel: pixel,
};

/**
 * Draw a specific shape repeatedly across a canvas.
 * @param {CanvasRenderingContext2D} ctx The canvas context.
 * @param {Obect} form The object that describes the pattern image.
 * @param {string} form.shape The shape of the pattern.
 * @param {('Light'|'Dark')} form.background Whether the background is light or dark
 * @param {number} form.hue The hue of the shapes.
 * @param {number} form.brightness The brightness of the shapes.
 */
const drawShapes = (ctx, form) => {
  const shape = shapes?.[form?.shape];

  const unit = 40;
  for (
    let offsetx = -unit * 6 - 5;
    offsetx <= unit * 8;
    offsetx += unit * 2
  ) {
    for (
      let offsety = -unit * 5 - 5;
      offsety <= unit * 7;
      offsety += unit * 2
    ) {
      ctx.fillStyle = hslToHex(
        (offsetx +
          (form?.hue ? (form.hue / 100) * 1200 : 0)) /
          (w / 100),
        100,
        Math.min(
          100,
          (form?.brightness ? form.brightness : 1) -
            (offsety / h) * 50 +
            9
        )
      );

      shape?.(ctx, offsetx, offsety);
    }
  }
};

/**
 * Render the pattern image on the canvas.
 * @param {Obect} form The object that describes the pattern image.
 * @param {string} form.shape The shape of the pattern.
 * @param {('Light'|'Dark')} form.background Whether the background is light or dark
 * @param {number} form.hue The hue of the shapes.
 * @param {number} form.brightness The brightness of the shapes.
 */
export const renderCanvas = (form) => {
  const canvas = document.getElementById('canvas');

  const ctx = canvas.getContext('2d');

  ctx.fillStyle =
    'Light' === form.background ? 'white' : 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawShapes(ctx, form);
};
