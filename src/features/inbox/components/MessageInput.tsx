import type React from 'react';
import { useState } from 'react';

/**
 * MessageInput Component
 * @constructor
 */
const MessageInput = ({ onSend }: { onSend: (msg: string) => void }) => {
  const [value, setValue] = useState('');
  const handleSend = () => {
    if (value.trim()) {
      onSend(value);
      setValue('');
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };
  return (
    <div className="flex-shrink-0 bg-white p-4">
      <div className="flex items-center gap-x-2">
        <input
          className="w-full rounded-lg border border-gray-300 bg-white p-2 text-[#333] placeholder-[#828282] focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a new message"
          type="text"
          value={value}
        />
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default MessageInput;
