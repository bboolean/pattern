import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Fab from '@mui/material/Fab';
import Select, {
  SelectChangeEvent,
} from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import GitHubIcon from '@mui/icons-material/GitHub';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { render } from 'react-dom';
import AddIcon from '@mui/icons-material/Add';
import { TryOutlined } from '@mui/icons-material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Slider from '@mui/material/Slider';

import { useStore } from './store.js';
import { renderCanvas, w, h } from './canvas.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function InnerModal() {
  const state = useStore((state) => state);
  const editBoxModal = useStore(
    (state) => state?.modals?.editBox
  );
  const form = useStore((state) => state?.form);
  const save = useStore((state) => state?.save);
  const update = useStore((state) => state.update);

  useEffect(() => {
    renderCanvas(form);
  }, [form]);

  return (
    <Box sx={style} onLoad={() => console.log('a')}>
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
            <canvas
              id="canvas"
              width={w}
              height={h}
              style={{
                flexBasis: w + 'px',
              }}
            ></canvas>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              flex: '1',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                flex: '1',
                overflowY: 'auto',
                overflowX: 'hidden',
                maxHeight: '60vh',
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
                  value={form?.type ?? 'Circles'}
                  label="Type *"
                  onChange={(e) => {
                    update('form', 'type', e.target.value);
                  }}
                >
                  {['Circles', 'Diamonds', 'Crosses'].map(
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
                    update(
                      'form',
                      'background',
                      e.target.value
                    );
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
              {/* {JSON.stringify(state)} */}
            </div>
          </div>
        </div>
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
        </div>{' '}
      </div>
    </Box>
  );
}

export function ButtonAppBar() {
  const newForm = useStore((state) => state.newForm);
  const togglePhone = useStore(
    (state) => state.togglePhone
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <AddCircleIcon />
          </IconButton> */}

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Patterns
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => {
                togglePhone();
              }}
            >
              {/* <Badge badgeContent={4} color="error"> */}
              <PhoneAndroidIcon />
              {/* </Badge> */}
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => {
                window.open(
                  'https://github.com/bboolean/pattern'
                );
              }}
            >
              {/* <Badge badgeContent={4} color="error"> */}
              <GitHubIcon />
              {/* </Badge> */}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const download = (item, src) => {
  var image = document.createElement('a');
  image.href = src;
  image.download =
    item.name.replace(/[^a-zA-Z0-9]/g, '_') + '.png';
  document.body.appendChild(image);
  image.click();
  document.body.removeChild(image);
};

export function PictureList() {
  const state = useStore((state) => state);
  const editBoxModal = useStore(
    (state) => state?.modals?.editBox
  );
  const editField = useStore((state) => state.editField);
  const update = useStore((state) => state.update);
  const list = useStore((state) => state.list);
  const open = useStore((state) => state.open);
  const form = useStore((state) => state.form);

  const newForm = useStore((state) => state.newForm);

  return (
    <List style={{ paddingRight: '1rem' }}>
      {Object.values(list ?? {}).map((item) => (
        <ListItem
          secondaryAction={
            <div
              style={{
                display: 'flex',
                gap: '1rem',
              }}
            >
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  download(item, item.image);
                }}
              >
                <DownloadIcon />
              </IconButton>
              {/* <IconButton
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton> */}
            </div>
          }
        >
          <ListItemButton
            onClick={() => {
              open(item);
            }}
          >
            <ListItemIcon>
              {/* <DraftsIcon /> */}
              <img
                src={item.image}
                style={{
                  width: '3rem',
                  height: '3rem',
                  border: '1px solid black',
                  borderRadius: '0.5rem',
                }}
              />
            </ListItemIcon>
            <ListItemText
              style={{
                marginLeft: '1rem',
              }}
              primary={item.name}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export function App() {
  const state = useStore((state) => state);
  const editBoxModal = useStore(
    (state) => state?.modals?.editBox
  );
  const editField = useStore((state) => state.editField);
  const update = useStore((state) => state.update);
  const list = useStore((state) => state.list);
  const open = useStore((state) => state.open);
  const form = useStore((state) => state.form);

  const newForm = useStore((state) => state.newForm);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" style={{ height: '100vh' }}>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
          <ButtonAppBar></ButtonAppBar>
          <div
            style={{
              maxHeight: 'calc(100vh - 64px)',
              overflowY: 'auto',
            }}
          >
            <nav aria-label="main mailbox folders">
              <List style={{ paddingRight: '1rem' }}>
                {Object.values(list ?? {}).map((item) => (
                  <ListItem
                    secondaryAction={
                      <div
                        style={{
                          display: 'flex',
                          gap: '1rem',
                        }}
                      >
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            download(item, item.image);
                          }}
                        >
                          <DownloadIcon />
                        </IconButton>
                        {/* <IconButton
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton> */}
                      </div>
                    }
                  >
                    <ListItemButton
                      onClick={() => {
                        open(item);
                      }}
                    >
                      <ListItemIcon>
                        {/* <DraftsIcon /> */}
                        <img
                          src={item.image}
                          style={{
                            width: '3rem',
                            height: '3rem',
                            border: '1px solid black',
                            borderRadius: '0.5rem',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        style={{
                          marginLeft: '1rem',
                        }}
                        primary={item.name}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </nav>
            <div
              style={{
                paddingTop: '5rem',
                paddingBottom: '5rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => {
                  newForm();
                }}
              >
                <AddIcon />
              </Fab>
            </div>
          </div>
        </Box>
        <Modal open={editBoxModal ?? false}>
          <InnerModal />
        </Modal>
      </Container>
    </>
  );
}
