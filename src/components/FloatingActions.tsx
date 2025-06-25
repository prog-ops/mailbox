import FlashOnIcon from '@mui/icons-material/FlashOn';
import InboxIcon from '@mui/icons-material/Inbox';
import TaskIcon from '@mui/icons-material/Task';
import { Fab, IconButton } from '@mui/material';
import type React from 'react';
import { useState } from 'react';

interface FloatingActionsProps {
  onInboxClick: () => void;
  onTaskClick: () => void;
}

const FloatingActions: React.FC<FloatingActionsProps> = ({
  onInboxClick,
  onTaskClick,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="absolute right-8 bottom-8 z-20 flex items-center gap-x-4"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* When hovered, shows Task and Inbox button */}
      {isHovering && (
        <div className="flex items-center gap-x-2">
          {/* Task button */}
          <div className="flex flex-col items-center">
            <span className="mb-1 text-gray-400 text-sm">Task</span>
            <IconButton
              className="bg-white hover:bg-gray-200"
              onClick={onTaskClick}
            >
              <TaskIcon sx={{ color: '#E59B4E' }} />
            </IconButton>
          </div>

          {/* Inbox button */}
          <div className="flex flex-col items-center">
            <span className="mb-1 text-gray-400 text-sm">Inbox</span>
            <IconButton
              className="bg-white hover:bg-gray-200"
              onClick={onInboxClick}
            >
              <InboxIcon sx={{ color: '#8885E4' }} />
            </IconButton>
          </div>
        </div>
      )}

      {/* FAB */}
      <Fab aria-label="main-action" color="primary">
        <FlashOnIcon />
      </Fab>
    </div>
  );
};

export default FloatingActions;
