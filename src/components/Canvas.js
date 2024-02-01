import { useEffect } from 'react';

import { h, renderCanvas, w } from '../canvas.js';
import { useStore } from '../store.js';

export function Canvas() {
  const form = useStore((state) => state?.form);

  useEffect(() => {
    renderCanvas(form);
  }, [form]);

  return (
    <canvas
      id="canvas"
      width={w}
      height={h}
      style={{
        flexBasis: w + 'px',
      }}
    ></canvas>
  );
}
