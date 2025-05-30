import React, { useState } from 'react';

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
        <div className="p-4 flex-shrink-0 bg-white">
            <div className="flex items-center gap-x-2">
                <input
                    type="text"
                    placeholder="Type a new message"
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 text-[#333] placeholder-[#828282] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                    onClick={handleSend}
                >Send</button>
            </div>
        </div>
    );
};
export default MessageInput;
