import React, { useState } from 'react';
import { Fab, IconButton } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import TaskIcon from '@mui/icons-material/Task';
import InboxIcon from '@mui/icons-material/Inbox';

interface FloatingActionsProps {
    onInboxClick: () => void;
    onTaskClick: () => void;
}

const FloatingActions: React.FC<FloatingActionsProps> = ({ onInboxClick, onTaskClick }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div
            className="absolute bottom-8 right-8 flex items-center gap-x-4"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* When hovered, shows Task and Inbox button */}
            {isHovering && (
                <div className="flex items-center gap-x-2">
                    {/* Task button */}
                    <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-400 mb-1">Task</span>
                        <IconButton className="bg-white hover:bg-gray-200">
                            <TaskIcon sx={{ color: '#E59B4E' }} />
                        </IconButton>
                    </div>

                    {/* Inbox button */}
                    <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-400 mb-1">Inbox</span>
                        <IconButton className="bg-white hover:bg-gray-200" onClick={onInboxClick}>
                            <InboxIcon sx={{ color: '#8885E4' }} />
                        </IconButton>
                    </div>
                </div>
            )}

            {/* FAB */}
            <Fab color="primary" aria-label="main-action">
                <FlashOnIcon />
            </Fab>
        </div>
    );
};

export default FloatingActions;
