import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

import { h, renderCanvas, w } from './canvas.js';
import { AddButton } from './components/AddButton.js';
import { MainAppBar } from './components/MainAppBar.js';
import { PictureList } from './components/PictureList.js';
import { download } from './download.js';
import { useStore } from './store.js';

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

export function FormButtons() {
  const state = useStore((state) => state);
  const editBoxModal = useStore(
    (state) => state?.modals?.editBox
  );
  const form = useStore((state) => state?.form);
  const save = useStore((state) => state?.save);
  const update = useStore((state) => state.update);
  const phone = useStore((state) => state.phone);

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'end',
        alignContent: 'end',
        flex: '1',
      }}
    >
      <Button
        variant="contained"
        onClick={() => {
          save();
        }}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          update('modals', 'editBox', false);
        }}
      >
        Cancel
      </Button>
    </div>
  );
}

export function PictureForm() {
  const state = useStore((state) => state);
  const editBoxModal = useStore(
    (state) => state?.modals?.editBox
  );
  const form = useStore((state) => state?.form);
  const save = useStore((state) => state?.save);
  const update = useStore((state) => state.update);
  const phone = useStore((state) => state.phone);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        flex: '1',
        overflowY: { xs: 'hidden', md: 'auto' },
        ...(phone
          ? {}
          : {
              overflowX: 'hidden',
              maxHeight: '60vh',
            }),
        padding: '1rem',
      }}
    >
      <TextField
        fullWidth
        label={'Name *'}
        value={form.name ?? ''}
        onChange={(e) =>
          update('form', 'name', e.target.value)
        }
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Shape
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={form?.type ?? 'Plus'}
          label="Shape *"
          onChange={(e) => {
            update('form', 'type', e.target.value);
          }}
        >
          {['Plus', 'Square', 'Diamond', 'Pixel'].map(
            (t) => (
              <MenuItem value={t}>{t}</MenuItem>
            )
          )}
        </Select>
      </FormControl>{' '}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Background
        </InputLabel>
        <Select
          id="demo-simple-select"
          value={form?.background ?? 'Dark'}
          label="Background *"
          onChange={(e) => {
            update('form', 'background', e.target.value);
          }}
        >
          {['Dark', 'Light'].map((t) => (
            <MenuItem value={t}>{t}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography
        id="track-false-range-slider"
        gutterBottom
      >
        Hue
      </Typography>
      <Slider
        defaultValue={50}
        aria-label="Default"
        valueLabelDisplay="auto"
        value={form.shift ?? ''}
        onChange={(e) =>
          update('form', 'shift', e.target.value)
        }
        max={100}
      />
      <Typography
        id="track-false-range-slider"
        gutterBottom
      >
        Lightness
      </Typography>
      <Slider
        defaultValue={50}
        aria-label="Default"
        valueLabelDisplay="auto"
        value={form.light ?? ''}
        onChange={(e) =>
          update('form', 'light', e.target.value)
        }
        max={100}
      />
    </Box>
  );
}

export function InnerModal() {
  const state = useStore((state) => state);
  const editBoxModal = useStore(
    (state) => state?.modals?.editBox
  );
  const form = useStore((state) => state?.form);
  const save = useStore((state) => state?.save);
  const update = useStore((state) => state.update);
  const phone = useStore((state) => state.phone);

  return (
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
            <PictureForm />
          </div>
        </div>
        <FormButtons />
      </div>
    </Box>
  );
}

export function App() {
  const editBoxModal = useStore(
    (state) => state?.modals?.editBox
  );
  const phone = useStore((state) => state.phone);

  return (
    <>
      <CssBaseline />
      <Container
        style={{
          ...(phone
            ? {
                maxWidth: '390px',
              }
            : {
                height: '100vh',
              }),
        }}
        disableGutters={true}
      >
        <div
          style={{
            height: '100vh',
            display: 'flex',
            ...(phone
              ? {
                  alignItems: 'center',
                }
              : {}),
          }}
        >
          <Box
            style={{
              background: '#cfe8fc',
              ...(phone
                ? {
                    height: '844px',
                    maxHeight: '100vh',
                  }
                : {}),
              width: '100%',
              // display: 'flex',
              // alignContent: 'center',
            }}
          >
            <Box>
              <MainAppBar />
              <div
                style={{
                  maxHeight: 'calc(100vh - 64px)',
                  overflowY: 'auto',
                }}
              >
                <PictureList />
                <AddButton />
              </div>
            </Box>
          </Box>
        </div>
        <Modal open={editBoxModal ?? false}>
          <InnerModal />
        </Modal>
      </Container>
    </>
  );
}
