import SearchIcon from '@mui/icons-material/Search';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar
      className="border-gray-700 border-b bg-[#313338]"
      elevation={0}
      position="static"
    >
      <Toolbar className="min-h-[48px]">
        <IconButton aria-label="search" color="inherit" edge="start">
          <SearchIcon />
        </IconButton>
        {/* Spacer, agar judul tidak menempel */}
        <div className="w-4" />
        <Typography color="inherit" component="div" variant="body1">
          Inbox
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
