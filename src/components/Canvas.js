import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';

import { h, renderCanvas, w } from '../canvas.js';
import { download } from '../download.js';
import { useStore } from '../store.js';

export function Canvas() {
  const form = useStore((state) => state?.form);

  useEffect(() => {
    renderCanvas(form);
  }, [form]);

  return (
    <div>
      <div
        style={{
          width: w,
          height: h,
          position: 'absolute',
          cursor: 'pointer',
          opacity: 0,
          transitionDuration: '0.25s',
          background: '#00000094',
          display: 'flex',
          justifyContent: 'center',
        }}
        onClick={() => {
          download(
            form,
            document.getElementById('canvas').toDataURL()
          );
        }}
        className="download"
      >
        <IconButton style={{ color: 'white' }}>
          <DownloadIcon sx={{ fontSize: '2rem' }} />
        </IconButton>
      </div>
      <canvas
        id="canvas"
        width={w}
        height={h}
        style={{
          flexBasis: w + 'px',
        }}
      ></canvas>
    </div>
  );
}
