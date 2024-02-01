import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useStore } from '../store.js';
import { download } from '../download.js';

export function PatternList() {
  const list = useStore((state) => state.list);
  const open = useStore((state) => state.open);

  return (
    <List style={{ paddingRight: '1rem' }}>
      {Object.values(list ?? {}).map((item) => (
        <ListItem
          secondaryAction={
            <IconButton
              edge="end"
              onClick={() => {
                download(item, item.image);
              }}
            >
              <DownloadIcon />
            </IconButton>
          }
        >
          <ListItemButton
            onClick={() => {
              open(item);
            }}
          >
            <img
              src={item.image}
              style={{
                width: '3rem',
                height: '3rem',
                border: '1px solid black',
                borderRadius: '0.2rem',
                marginRight: '1rem',
              }}
            />
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
