import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';

import { h, w } from '../canvas.js';
import { download } from '../download.js';
import { useStore } from '../store.js';

import { Canvas } from './Canvas.js';
import { PatternForm } from './PatternForm.js';
import { FormButtons } from './FormButtons.js';

export function PatternModal() {
  const state = useStore((state) => state);
  const editBoxModal = useStore(
    (state) => state?.modals?.editBox
  );
  const form = useStore((state) => state?.form);
  const save = useStore((state) => state?.save);
  const update = useStore((state) => state.update);
  const phone = useStore((state) => state.phone);

  return (
    <Modal open={editBoxModal ?? false}>
      <Box
        sx={{
          position: 'absolute',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          top: { md: '50%' },
          left: { md: '50%' },
          transform: { md: 'translate(-50%, -50%)' },
          ...(phone
            ? {
                width: '390px',
                height: '844px',
                maxWidth: '100vw',
                maxHeight: '100vh',
              }
            : {
                height: { xs: '100vh', md: 'inherit' },
              }),
        }}
        onLoad={() => console.log('a')}
      >
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            flexDirection: 'column',
            justifyContent: 'end',
            alignContent: 'end',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
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
                    document
                      .getElementById('canvas')
                      .toDataURL()
                  );
                }}
                className="download"
              >
                <IconButton style={{ color: 'white' }}>
                  <DownloadIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
              </div>
              <Canvas />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                flex: '1',
              }}
            >
              <PatternForm />
            </div>
          </div>
          <FormButtons />
        </div>
      </Box>
    </Modal>
  );
}
