import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useStore } from '../store.js';

export function PatternForm() {
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
        <InputLabel>Shape</InputLabel>
        <Select
          id="demo-simple-select"
          value={form?.type ?? 'Plus'}
          label="Shape *"
          onChange={(e) => {
            update('form', 'type', e.target.value);
          }}
        >
          {['Plus', 'Square', 'Diamond', 'Pixel'].map(
            (t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Background</InputLabel>
        <Select
          id="demo-simple-select"
          value={form?.background ?? 'Dark'}
          label="Background *"
          onChange={(e) => {
            update('form', 'background', e.target.value);
          }}
        >
          {['Dark', 'Light'].map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
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
        value={form.shift ?? 0}
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
        value={form.light ?? 50}
        onChange={(e) =>
          update('form', 'light', e.target.value)
        }
        max={100}
      />
    </Box>
  );
}
