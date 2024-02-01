import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import { AddButton } from './AddButton.js';
import { MainAppBar } from './MainAppBar.js';
import { PictureList } from './PictureList.js';
import { PatternModal } from './PatternModal.js';
import { useStore } from '../store.js';

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
        <PatternModal />
      </Container>
    </>
  );
}
