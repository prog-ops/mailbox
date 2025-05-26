import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface NewMessageButtonProps {
    count: number;
    onClick: () => void;
}

const NewMessageButton: React.FC<NewMessageButtonProps> = ({ count, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute bottom-24 right-8 z-10 flex items-center gap-x-2 bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-blue-200 transition-all"
        >
            <div className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
                {count}
            </div>
            <span>New Message</span>
            <ArrowDownwardIcon fontSize="small" />
        </button>
    );
};

export default NewMessageButton;
