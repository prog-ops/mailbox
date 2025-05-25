import { useState, useEffect } from 'react';
import type {CommentItem, InboxItem} from "../types/inbox.ts";

const APP_ID = '68315676b43cb9e04e38ea1e';

/**
 * Hook untuk mengambil detail percakapan (post dan komentar) berdasarkan postId
 * @param postId
 */
const useConversation = (postId: string | undefined) => {
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [post, setPost] = useState<InboxItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!postId) return;

        const fetchConversation = async () => {
            setLoading(true);
            try {
                // Ambil detail post asli (untuk judul dan pemilik) & komentar
                const [postRes, commentsRes] = await Promise.all([
                    fetch(`https://dummyapi.io/data/v1/post/${postId}`, { headers: { 'app-id': APP_ID } }),
                    fetch(`https://dummyapi.io/data/v1/post/${postId}/comment`, { headers: { 'app-id': APP_ID } })
                ]);

                const postData = await postRes.json();
                const commentsData = await commentsRes.json();

                setPost(postData);
                setComments(commentsData.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchConversation();
    }, [postId]);

    return { post, comments, loading };
};

export default useConversation;
