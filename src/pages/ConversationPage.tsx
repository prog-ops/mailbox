import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import useConversation from "../hooks/useConversation.ts";
import MainLayout from "../layouts/MainLayout.tsx";
import ChatHeader from "../features/inbox/components/ChatHeader.tsx";
import MessageBubble from "../features/inbox/components/MessageBubble.tsx";
import MessageInput from "../features/inbox/components/MessageInput.tsx";

/**
 * ConversationPage component displays a single conversation
 * @constructor
 */
const ConversationPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const { post, comments, loading } = useConversation(postId);

    // Simulasi: ID pengguna yang sedang login adalah pemilik postingan asli
    const currentUserId = post?.owner.id;

    if (loading) {
        return <MainLayout><div className="flex justify-center items-center h-full"><CircularProgress /></div></MainLayout>;
    }

    if (!post) {
        return <MainLayout><div className="flex justify-center items-center h-full">Conversation not found.</div></MainLayout>;
    }

    return (
        <MainLayout>
            <div className="flex flex-col h-full">
                <ChatHeader title={post.subject || 'Conversation'} participantCount={comments.length + 1} />
                <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                    {comments.map(comment => (
                        <MessageBubble
                            key={comment.id}
                            comment={comment}
                            isMe={comment.owner.id === currentUserId}
                        />
                    ))}
                </div>
                <MessageInput />
            </div>
        </MainLayout>
    );
};

export default ConversationPage;
