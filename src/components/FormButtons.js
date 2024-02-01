import Button from '@mui/material/Button';

import { useStore } from '../store.js';

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
