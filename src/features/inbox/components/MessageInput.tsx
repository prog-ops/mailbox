/**
 * MessageInput Component
 * @constructor
 */
const MessageInput = () => (
    <div className="p-4 border-t border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-x-2">
            <input type="text" placeholder="Type a new message" className="w-full bg-[#3c4043] border border-gray-500 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"/>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Send</button>
        </div>
    </div>
);
export default MessageInput;
