import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

interface ChatHeaderProps {
  title: string;
  participantCount: number;
}

/**
 * ChatHeader component displays the header for a chat conversation
 * @param title
 * @param participantCount
 * @constructor
 */
const ChatHeader: React.FC<ChatHeaderProps> = ({ title, participantCount }) => (
  <div className="flex flex-shrink-0 items-center border-gray-700 border-b p-3">
    <Link className="rounded-full p-1 hover:bg-gray-700" to="/">
      <ArrowBackIcon />
    </Link>
    <div className="ml-4">
      <h2 className="font-semibold text-blue-400">{title}</h2>
      <p className="text-gray-400 text-xs">{participantCount} Participants</p>
    </div>
    <Link className="ml-auto rounded-full p-1 hover:bg-gray-700" to="/">
      <CloseIcon />
    </Link>
  </div>
);
export default ChatHeader;
