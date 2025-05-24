import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
    return (
        <AppBar position="static" elevation={0} className="bg-[#313338] border-b border-gray-700">
            <Toolbar className="min-h-[48px]">
                <IconButton edge="start" color="inherit" aria-label="search">
                    <SearchIcon />
                </IconButton>
                {/* Spacer, agar judul tidak menempel */}
                <div className="w-4"></div>
                <Typography variant="body1" color="inherit" component="div">
                    Inbox
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
