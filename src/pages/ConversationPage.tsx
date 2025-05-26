import {useParams} from 'react-router-dom';
import useConversation from "../hooks/useConversation.ts";
import ChatHeader from "../features/inbox/components/ChatHeader.tsx";
import MessageBubble from "../features/inbox/components/MessageBubble.tsx";
import MessageInput from "../features/inbox/components/MessageInput.tsx";
import {useRef, useState, useEffect, Fragment} from "react";
import type {CommentItem} from "../types/inbox.ts";
import NewMessageButton from "../features/inbox/components/NewMessageButton.tsx";
import NewMessageSeparator from "../features/inbox/components/NewMessageSeparator.tsx";
import {CircularProgress} from "@mui/material";

/**
 * ConversationPage component displays a single conversation
 * @constructor
 */
const ConversationPage = () => {
    const { postId } = useParams<{ postId: string }>();

    // Mengambil data awal dari cache React Query
    const { data, isLoading, isError, error } = useConversation(postId);

    // Ambil post dan comments dari data yang di-fetch
    const post = data?.post;
    const initialComments = data?.comments;
    const currentUserId = post?.owner.id; // Simulasi ID pengguna saat ini

    // STATE LOKAL UNTUK INTERAKTIVITAS REAL-TIME
    // State untuk menampung pesan yang ada + pesan baru yang disimulasikan
    const [liveComments, setLiveComments] = useState<CommentItem[]>([]);
    // State untuk mendeteksi posisi scroll
    const [isAtBottom, setIsAtBottom] = useState(true);
    // State untuk UI "Pesan Baru"
    const [newMessagesCount, setNewMessagesCount] = useState(0);
    const [firstUnreadId, setFirstUnreadId] = useState<string | null>(null);
    // State untuk transisi slide-in
    const [isVisible, setIsVisible] = useState(false);

    // Ref untuk mengakses DOM dari kontainer scroll
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Efek untuk slide-in saat komponen pertama kali muncul
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Efek untuk menginisialisasi state 'liveComments' saat data dari React Query tersedia
    useEffect(() => {
        if (initialComments) {
            setLiveComments(initialComments);
        }
    }, [initialComments]);

    // Efek untuk scroll ke bawah secara otomatis
    useEffect(() => {
        // Scroll ke bawah jika pengguna memang sudah berada di bawah
        if (isAtBottom && scrollContainerRef.current) {
            const { scrollHeight } = scrollContainerRef.current;
            scrollContainerRef.current.scrollTo({ top: scrollHeight, behavior: 'auto' });
        }
    }, [liveComments, isAtBottom]);

    // Efek untuk mensimulasikan datangnya pesan baru
    useEffect(() => {
        // Jangan jalankan simulasi jika data awal masih loading
        if (isLoading) return;

        const interval = setInterval(() => {
            // Objek pesan baru untuk simulasi
            const newComment: CommentItem = {
                id: `msg-${Date.now()}`,
                message: `This is a new simulated message at ${new Date().toLocaleTimeString()}`,
                publishDate: new Date().toISOString(),
                owner: { id: 'some-other-user-id', firstName: 'Mary', lastName: 'Hilda', picture: '' },
            };

            // Tambahkan pesan baru ke state live
            setLiveComments(prev => [...prev, newComment]);

            // Jika user tidak di bawah, update UI "Pesan Baru"
            if (!isAtBottom) {
                setNewMessagesCount(prev => prev + 1);
                setFirstUnreadId(prev => prev ?? newComment.id);
            }
        }, 8000); // Pesan baru setiap 8 detik

        return () => clearInterval(interval);
    }, [isAtBottom, isLoading]);

    // Handler untuk event onScroll
    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const atBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50;
            setIsAtBottom(atBottom);
            if (atBottom) {
                setNewMessagesCount(0);
                setFirstUnreadId(null);
            }
        }
    };

    // Handler untuk tombol "New Message"
    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: scrollContainerRef.current.scrollHeight, behavior: 'smooth' });
        }
    };

    // 4. RENDER LOGIC
    // Tampilan saat data masih dimuat oleh React Query
    if (isLoading) {
        return (
            <div className="absolute top-0 left-0 w-full h-full bg-[#282c34] flex justify-center items-center">
                <CircularProgress />
            </div>
        );
    }

    // Tampilan jika terjadi error
    if (isError) {
        return (
            <div className="absolute top-0 left-0 w-full h-full bg-[#282c34] flex justify-center items-center text-red-500">
                Error: {error.message}
            </div>
        );
    }

    // Tampilan utama
    return (
        <div
            className={`absolute top-0 left-0 w-full h-full bg-[#282c34] z-10 transition-transform duration-300 ease-in-out ${
                isVisible ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <div className="flex flex-col h-full">
                <ChatHeader title={post?.subject || 'Conversation'} participantCount={liveComments.length + 1} />

                <div
                    className="flex-grow p-4 space-y-4 overflow-y-auto"
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                >
                    {liveComments.map(comment => (
                        <Fragment key={comment.id}>
                            {comment.id === firstUnreadId && <NewMessageSeparator />}
                            <MessageBubble
                                comment={comment}
                                isMe={comment.owner.id === currentUserId}
                            />
                        </Fragment>
                    ))}
                </div>

                {newMessagesCount > 0 && <NewMessageButton count={newMessagesCount} onClick={scrollToBottom} />}

                <MessageInput />
            </div>
        </div>
    );
};

export default ConversationPage;
