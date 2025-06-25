import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import type React from 'react';

interface NewMessageButtonProps {
  count: number;
  onClick: () => void;
  isAtBottom?: boolean;
}

const NewMessageButton: React.FC<NewMessageButtonProps> = ({
  count,
  onClick,
  isAtBottom,
}) => {
  const bubbleColor = isAtBottom
    ? 'bg-[#FCEED3] text-[#E5A443]'
    : 'bg-[#D2F2EA] text-[#43B78D]';
  const countColor = isAtBottom
    ? 'bg-[#E5A443] text-white'
    : 'bg-[#43B78D] text-white';
  return (
    <button
      className={`absolute right-8 bottom-24 z-10 flex items-center gap-x-2 rounded-full px-4 py-2 font-semibold shadow-lg transition-all ${bubbleColor}`}
      onClick={onClick}
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${countColor}`}
      >
        {count}
      </div>
      <span>New Message</span>
      <ArrowDownwardIcon fontSize="small" />
    </button>
  );
};

export default NewMessageButton;
