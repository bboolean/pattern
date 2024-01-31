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

const gradient = (ctx) => {
  for (let x = 0; x < w; x += 10) {
    for (let y = 0; y < h; y += 10) {
      ctx.fillStyle = hslToHex(
        x / (w / 100),
        100,
        50 - (y / h) * 50
      );
      ctx.fillRect(x, y, 10, 10);
    }
  }
};

const pixel = (ctx, offsetx, offsety) => {
  // for (let t = 0; t < r * 3; t += 1) {
  //   const x =
  //     Math.round((half + r * Math.cos(t)) / 10) * 10;
  //   const y =
  //     Math.round((half + r * Math.sin(t)) / 10) * 10;

  ctx.fillRect(offsetx, offsety + 4 * 10, 10, 10);
  ctx.fillRect(offsetx, offsety + 8 * 10, 10, 10);
  ctx.fillRect(offsetx + 4 * 10, offsety + 4 * 10, 10, 10);
  ctx.fillRect(offsetx + 4 * 10, offsety + 8 * 10, 10, 10);
  // }
};

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

const diamond = (ctx, offsetx, offsety) => {
  for (let y = 0; y <= 2; y++) {
    ctx.fillRect(
      offsetx - 2 * 10 + y * 10,
      offsety + y * 10 + 1 * 10,
      10,
      10
    );
    ctx.fillRect(
      offsetx + 2 * 10 - y * 10,
      offsety + y * 10 + 1 * 10,
      10,
      10
    );
    ctx.fillRect(
      offsetx - 2 * 10 + y * 10,
      offsety + y * 10 + 1 * 10,
      10,
      10
    );
    ctx.fillRect(
      offsetx - y * 10,
      offsety + y * 10 - 1 * 10,
      10,
      10
    );
    ctx.fillRect(
      offsetx + y * 10,
      offsety + y * 10 - 1 * 10,
      10,
      10
    );
  }
  for (let y = 0; y <= 2; y++) {
    ctx.fillRect(
      offsetx - 2 * 10 + y * 10,
      offsety + y * 10 + 2 * 10,
      10,
      10
    );
    ctx.fillRect(
      offsetx + 3 * 10 - y * 10,
      offsety + y * 10 + 1 * 10,
      10,
      10
    );
    ctx.fillRect(
      offsetx + 1 * 10 + y * 10,
      offsety + y * 10 - 1 * 10,
      10,
      10
    );
    ctx.fillRect(
      offsetx - y * 10,
      offsety + y * 10 - 2 * 10,
      10,
      10
    );
  }
  ctx.fillRect(offsetx - 3 * 10, offsety + 1 * 10, 10, 10);
};

const types = {
  Plus: plus,
  Diamond: diamond,
  Square: square,
  Pixel: pixel,
};

const drawShapes = (ctx, form) => {
  const half = w / 2;
  const ratio = 0.7;
  const size = half * ratio;
  const shape = types?.[form?.type];

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
      console.log(
        (form?.light ? form.light : 1) -
          (offsety / h) * 50 -
          1
      );
      ctx.fillStyle = hslToHex(
        (offsetx +
          (form?.shift ? (form.shift / 100) * 1200 : 0)) /
          (w / 100),
        100,
        Math.min(
          100,
          (form?.light ? form.light : 1) -
            (offsety / h) * 50 -
            1
        )
      );

      shape?.(ctx, offsetx, offsety);
      // drawCircle(ctx, half, half / 5, offsetx, offsety);
    }
  }
};

export const renderCanvas = (form) => {
  const canvas = document.getElementById('canvas');

  const ctx = canvas.getContext('2d');

  ctx.fillStyle =
    'Light' === form.background ? 'white' : 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawShapes(ctx, form);
};
