import { format } from 'date-fns';
import type {CommentItem} from "../../../types/inbox.ts";
import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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
const MessageBubble: React.FC<MessageBubbleProps> = ({ comment, isMe, onReply, replyToSender, replyToMessage }) => {
    const bubbleClasses = isMe
        ? 'bg-[#EEDCFF] text-[#9B51E0] ml-auto'
        : 'bg-[#FCEED3] text-[#E5A443] mr-auto';
    const nameClasses = isMe ? 'text-[#9B51E0] font-semibold mb-1 text-sm' : 'text-[#E5A443] font-semibold mb-1 text-sm';
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
            <span className={nameClasses}>{senderName}</span>
            <div className={`relative p-3 rounded-lg max-w-lg ${bubbleClasses}`}>
                {replyToMessage && (
                    <div className="mb-2 p-2 rounded bg-gray-100 text-xs text-gray-700 border-l-4 border-blue-400">
                        <span className="font-semibold">{replyToSender}</span>
                        <div>{replyToMessage}</div>
                    </div>
                )}
                <div className={`absolute top-1 ${isMe ? 'left-1' : 'right-1'}`}>
                    <IconButton size="small" onClick={handleMenuClick}>
                        <MoreHorizIcon fontSize="small" />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose} anchorOrigin={{vertical:'bottom',horizontal:'right'}} transformOrigin={{vertical:'top',horizontal:'right'}}>
                        <MenuItem onClick={handleMenuClose}>Share</MenuItem>
                        <MenuItem onClick={handleReply}>Reply</MenuItem>
                    </Menu>
                </div>
                <p>{comment.message}</p>
                <p className="text-xs opacity-70 mt-1 text-right">{format(new Date(comment.publishDate), 'HH:mm')}</p>
            </div>
        </div>
    );
};
export default MessageBubble;
