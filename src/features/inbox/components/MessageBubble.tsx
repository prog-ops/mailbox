import { format } from 'date-fns';
import type {CommentItem} from "../../../types/inbox.ts";

interface MessageBubbleProps { comment: CommentItem; isMe: boolean; }

/**
 * MessageBubble component displays a single message bubble
 * @param comment
 * @param isMe
 * @constructor
 */
const MessageBubble: React.FC<MessageBubbleProps> = ({ comment, isMe }) => {
    const bubbleClasses = isMe
        ? 'bg-purple-200 text-purple-900 ml-auto'
        : 'bg-yellow-100 text-gray-800 mr-auto';

    const senderName = `${comment.owner.firstName} ${comment.owner.lastName}`;

    return (
        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
            {!isMe && <span className="text-sm text-green-400 font-semibold mb-1">{senderName}</span>}
            <div className={`p-3 rounded-lg max-w-lg ${bubbleClasses}`}>
                <p>{comment.message}</p>
                <p className="text-xs opacity-70 mt-1 text-right">{format(new Date(comment.publishDate), 'HH:mm')}</p>
            </div>
        </div>
    );
};
export default MessageBubble;
