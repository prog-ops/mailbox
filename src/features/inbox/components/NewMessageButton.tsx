import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface NewMessageButtonProps {
    count: number;
    onClick: () => void;
    isAtBottom?: boolean;
}

const NewMessageButton: React.FC<NewMessageButtonProps> = ({ count, onClick, isAtBottom }) => {
    const bubbleColor = isAtBottom ? 'bg-[#FCEED3] text-[#E5A443]' : 'bg-[#D2F2EA] text-[#43B78D]';
    const countColor = isAtBottom ? 'bg-[#E5A443] text-white' : 'bg-[#43B78D] text-white';
    return (
        <button
            onClick={onClick}
            className={`absolute bottom-24 right-8 z-10 flex items-center gap-x-2 font-semibold py-2 px-4 rounded-full shadow-lg transition-all ${bubbleColor}`}
        >
            <div className={`w-6 h-6 flex items-center justify-center rounded-full text-sm ${countColor}`}>
                {count}
            </div>
            <span>New Message</span>
            <ArrowDownwardIcon fontSize="small" />
        </button>
    );
};

export default NewMessageButton;
