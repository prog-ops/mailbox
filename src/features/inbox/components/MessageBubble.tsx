import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { format } from 'date-fns';
import type React from 'react';
import { useState } from 'react';
import type { CommentItem } from '../../../types/inbox.ts';

interface MessageBubbleProps {
  comment: CommentItem;
  isMe: boolean;
  onReply?: (comment: CommentItem) => void;
  replyToSender?: string;
  replyToMessage?: string;
}

/**
 * MessageBubble component displays a single message bubble
 * @param comment
 * @param isMe
 * @constructor
 */
const MessageBubble: React.FC<MessageBubbleProps> = ({
  comment,
  isMe,
  onReply,
  replyToSender,
  replyToMessage,
}) => {
  const bubbleClasses = isMe
    ? 'bg-[#EEDCFF] text-[#9B51E0] ml-auto'
    : 'bg-[#FCEED3] text-[#E5A443] mr-auto';
  const nameClasses = isMe
    ? 'text-[#9B51E0] font-semibold mb-1 text-sm'
    : 'text-[#E5A443] font-semibold mb-1 text-sm';
  const senderName = `${comment.owner.firstName} ${comment.owner.lastName}`;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleReply = () => {
    handleMenuClose();
    if (onReply) onReply(comment);
  };

  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
      {isMe ? (
        <span className="mb-1 block w-full text-right font-semibold text-[#9B51E0] text-sm">
          You
        </span>
      ) : (
        <span className={nameClasses}>{senderName}</span>
      )}
      <div className={`relative max-w-lg rounded-lg p-3 ${bubbleClasses}`}>
        {replyToMessage && (
          <div className="mb-2 rounded border-blue-400 border-l-4 bg-gray-100 p-2 text-gray-700 text-xs">
            <span className="font-semibold">{replyToSender}</span>
            <div>{replyToMessage}</div>
          </div>
        )}
        <div className={`absolute top-1 ${isMe ? 'left-1' : 'right-1'}`}>
          <IconButton onClick={handleMenuClick} size="small">
            <MoreHorizIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            onClose={handleMenuClose}
            open={openMenu}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleMenuClose}>Share</MenuItem>
            <MenuItem onClick={handleReply}>Reply</MenuItem>
          </Menu>
        </div>
        <p>{comment.message}</p>
        <p className="mt-1 text-right text-xs opacity-70">
          {format(new Date(comment.publishDate), 'HH:mm')}
        </p>
      </div>
    </div>
  );
};
export default MessageBubble;
