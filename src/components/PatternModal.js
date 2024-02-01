import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { useStore } from '../store.js';

import { Canvas } from './Canvas.js';
import { FormButtons } from './FormButtons.js';
import { PatternForm } from './PatternForm.js';

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
          top: { lg: '50%' },
          left: { lg: '50%' },
          transform: { lg: 'translate(-50%, -50%)' },
          height: { xs: '100vh', lg: 'inherit' },
          width: { xs: '100vw', lg: 'inherit' },
          ...(phone
            ? {
                width: '390px',
                height: '844px',
                maxWidth: '100vw',
                maxHeight: '100vh',
              }
            : {}),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '2rem',
            flexDirection: 'column',
            justifyContent: 'end',
            alignContent: 'end',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              ...(phone
                ? {
                    flexDirection: 'column',
                  }
                : {}),
            }}
          >
            <Canvas />
            <PatternForm />
          </Box>
          <FormButtons />
        </Box>
      </Box>
    </Modal>
  );
}
