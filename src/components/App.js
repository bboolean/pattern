import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import { useStore } from '../store.js';
import { AddButton } from './AddButton.js';
import { MainAppBar } from './MainAppBar.js';
import { PatternList } from './PatternList.js';
import { PatternModal } from './PatternModal.js';

export function App() {
  const editBoxModal = useStore(
    (state) => state?.modals?.editBox
  );
  const phone = useStore((state) => state.phone);

  return (
    <>
      <CssBaseline />
      <Container
        sx={{
          height: '100svh',
          display: 'flex',
          ...(phone
            ? {
                maxWidth: '390px',
                alignItems: 'center',
                justifyContent: 'center',
              }
            : {}),
        }}
        disableGutters={true}
      >
        <Box
          sx={{
            background: '#cfe8fc',
            width: '100%',
            ...(phone
              ? {
                  height: '844px',
                  maxHeight: '100svh',
                  maxWidth: '390px',
                }
              : {}),
          }}
        >
          <MainAppBar />
          <Box
            sx={{
              maxHeight: 'calc(100svh - 64px)',
              overflowY: 'auto',
            }}
          >
            <PatternList />
            <AddButton />
          </Box>
        </Box>
        <PatternModal />
      </Container>
    </>
  );
}
