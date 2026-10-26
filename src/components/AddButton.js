import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { useStore } from '../store.js';

/**
 * Circular plus button that prompts the user to make a new pattern image.
 * @returns {React.ReactElement}
 */
export function AddButton() {
  const newForm = useStore((state) => state.newForm);

  return (
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
  );
}
