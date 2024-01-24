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

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

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
  border: '2px solid #000',
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
    x = Math.round((half + r * Math.cos(t)) / 10) * 10;
    y = Math.round((half + r * Math.sin(t)) / 10) * 10;

    ctx.fillRect(x + offsetx, y + offsety, 10, 10);
  }
};

const circles = (ctx) => {
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
        offsetx / (w / 100),
        100,
        50 - (offsety / h) * 50
      );
      drawCircle(ctx, half, half / 5, offsetx, offsety);
    }
  }
};

const renderCanvas = (args) => {
  setTimeout(() => {
    const canvas = document.getElementById('canvas');

    const ctx = canvas.getContext('2d');

    if ('circles' === args?.type) {
      circles(ctx);
    } else {
      gradient(ctx);
    }
  });
};

export function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [open, setOpen] = useState({});

  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
          <nav aria-label="secondary mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Trash" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href="#simple-list"
                >
                  <ListItemText primary="Spam" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
        <Modal
          open={true}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container direction={'row'}>
              <Grid sx={{ width: w }}>
                <canvas
                  id="canvas"
                  width={w}
                  height={h}
                ></canvas>
              </Grid>
              <Grid xs>
                <Grid container columnGap={3}>
                  <Grid xs={12}>
                    <TextField
                      id="outlined-disabled"
                      defaultValue="Hello World"
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      id="outlined-disabled"
                      defaultValue="Hello World"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Container>
    </>
  );
}
