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

const drawCircle = (ctx, half, r, offsetx, offsety) => {
  for (let t = 0; t < r * 3; t += 1) {
    const x =
      Math.round((half + r * Math.cos(t)) / 10) * 10;
    const y =
      Math.round((half + r * Math.sin(t)) / 10) * 10;

    ctx.fillRect(x + offsetx, y + offsety, 10, 10);
  }
};

const circles = (ctx, form) => {
  const half = w / 2;
  const ratio = 0.7;
  const size = half * ratio;

  const unit = 40;
  for (
    let offsetx = -unit * 6 - 5;
    offsetx < unit * 6;
    offsetx += unit * 2
  ) {
    for (
      let offsety = -unit * 6 - 5;
      offsety < unit * 6;
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
      drawCircle(ctx, half, half / 5, offsetx, offsety);
    }
  }
};

const floorToTen = (x) => Math.floor(x / 10) * 10;

const drawDiamond = (ctx, half, size, offsetx, offsety) => {
  for (let x = -size; x <= size; x += 10) {
    // x = Math.round((half + r * Math.cos(t)) / 10) * 10;
    // y = Math.round((half + r * Math.sin(t)) / 10) * 10;
    const y = floorToTen(size / 2 - Math.abs(x));

    ctx.fillRect(x + offsetx, y + offsety, 10, 10);
    ctx.fillRect(
      x + offsetx,
      floorToTen(size - y) + offsety - size * 2.5,
      10,
      10
    );
  }
};

const diamonds = (ctx) => {
  const half = w / 2;
  const ratio = 0.7;
  const size = half * ratio;

  const unit = 40;
  for (
    let offsetx = -unit * 6 - 1;
    offsetx < unit * 6;
    offsetx += unit * 2
  ) {
    for (
      let offsety = -unit * 6 - 5;
      offsety < unit * 6;
      offsety += unit * 2.1
    ) {
      ctx.fillStyle = hslToHex(
        offsetx / (w / 100),
        100,
        50 - (offsety / h) * 50
      );
      drawDiamond(
        ctx,
        half,
        half / 5,
        offsetx,
        offsety + 5
      );
    }
  }
};

const types = {
  Circles: circles,
  Diamonds: diamonds,
};

export const renderCanvas = (form) => {
  const canvas = document.getElementById('canvas');

  const ctx = canvas.getContext('2d');

  ctx.fillStyle =
    'Light' === form.background ? 'white' : 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  types?.[form?.type]?.(ctx, form);
};
