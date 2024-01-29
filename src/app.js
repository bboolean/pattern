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
import { create } from 'zustand';
import { render } from 'react-dom';
import { TryOutlined } from '@mui/icons-material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

const defaultForm = {
  type: 'Circles',
};

const useStore = create((set) => ({
  modals: {},
  form: defaultForm,
  list: {},
  nextIndex: 0,
  update: (category, name, value) =>
    set((state) => ({
      [category]: {
        ...state?.[category],
        [name]: value,
      },
    })),
  newForm: () =>
    set((state) => ({
      form: defaultForm,
      modals: {
        ...state.modals,
        editBox: true,
      },
    })),
  save: () =>
    set((state) => {
      if (state.form.id) {
        return {
          list: {
            ...state.list,
            [state.form.id]: state.form,
          },
          modals: {
            ...state.modals,
            editBox: false,
          },
        };
      } else {
        return {
          list: {
            ...state.list,
            [state.nextIndex]: {
              ...state.form,
              id: state.nextIndex,
            },
          },
          nextIndex: 1 + state.nextIndex,
          modals: {
            ...state.modals,
            editBox: false,
          },
        };
      }
    }),
  open: (item) =>
    set((state) => ({
      form: item,
      modals: {
        ...state.modals,
        editBox: TryOutlined,
      },
    })),
}));

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

export default function ButtonUsage() {
  return <Button variant="contained">Hello world</Button>;
}

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

const w = 10 * 2 ** 5;
const h = 10 * 2 ** 5;

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
      ctx.fillStyle = hslToHex(
        (offsetx + (form?.shift ?? 0)) / (w / 100),
        100,
        50 - (offsety / h) * 50
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

const renderCanvas = (form) => {
  const canvas = document.getElementById('canvas');

  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  types?.[form?.type]?.(ctx, form);
};

import AddCircleIcon from '@mui/icons-material/AddCircle';

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
                maxHeight: '60vh',
                paddingTop: '1rem',
                paddingRight: '1rem',
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
                  Type
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
              </FormControl>
              <TextField
                fullWidth
                value={form.shift ?? ''}
                onChange={(e) =>
                  update('form', 'shift', e.target.value)
                }
              />
              <TextField
                fullWidth
                value={form.shift ?? ''}
                onChange={(e) =>
                  update('form', 'shift', e.target.value)
                }
              />
              <TextField
                fullWidth
                value={form.shift ?? ''}
                onChange={(e) =>
                  update('form', 'shift', e.target.value)
                }
              />
              <TextField
                fullWidth
                value={form.shift ?? ''}
                onChange={(e) =>
                  update('form', 'shift', e.target.value)
                }
              />
              <TextField
                fullWidth
                value={form.shift ?? ''}
                onChange={(e) =>
                  update('form', 'shift', e.target.value)
                }
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
          <Button
            color="inherit"
            onClick={() => {
              newForm();
            }}
          >
            {' '}
            New
          </Button>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              {/* <Badge badgeContent={4} color="error"> */}
              <AddCircleIcon />
              {/* </Badge> */}
            </IconButton>{' '}
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              {/* <Badge badgeContent={4} color="error"> */}
              <PhoneAndroidIcon />
              {/* </Badge> */}
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
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

export function App() {
  const state = useStore((state) => state);
  const editBoxModal = useStore(
    (state) => state?.modals?.editBox
  );
  const editField = useStore((state) => state.editField);
  const update = useStore((state) => state.update);
  const list = useStore((state) => state.list);
  const open = useStore((state) => state.open);

  const newForm = useStore((state) => state.newForm);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
          <ButtonAppBar></ButtonAppBar>

          <nav aria-label="main mailbox folders">
            <List>
              {Object.values(list ?? {}).map((item) => (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      open(item);
                    }}
                  >
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
        <Modal
          open={editBoxModal ?? false}
          // onClose={() => update('modals', 'editBox', false)}
        >
          <InnerModal />
        </Modal>
      </Container>
    </>
  );
}
