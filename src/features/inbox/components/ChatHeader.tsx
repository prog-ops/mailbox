import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

interface ChatHeaderProps { title: string; participantCount: number; }

/**
 * ChatHeader component displays the header for a chat conversation
 * @param title
 * @param participantCount
 * @constructor
 */
const ChatHeader: React.FC<ChatHeaderProps> = ({ title, participantCount }) => (
    <div className="flex items-center p-3 border-b border-gray-700 flex-shrink-0">
        <Link to="/" className="p-1 rounded-full hover:bg-gray-700"><ArrowBackIcon /></Link>
        <div className="ml-4">
            <h2 className="font-semibold text-blue-400">{title}</h2>
            <p className="text-xs text-gray-400">{participantCount} Participants</p>
        </div>
        <Link to="/" className="ml-auto p-1 rounded-full hover:bg-gray-700"><CloseIcon /></Link>
    </div>
);
export default ChatHeader;
