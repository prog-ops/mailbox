import type {CommentItem, InboxItem} from "../types/inbox.ts";
import {useQuery} from "@tanstack/react-query";

const APP_ID = '68315676b43cb9e04e38ea1e';

/**
 * Hook untuk mengambil detail percakapan (post dan komentar) berdasarkan postId
 * @param postId
 */
// Fungsi async untuk mengambil data, dipisahkan dari hook
const fetchConversation = async (postId: string): Promise<{ post: InboxItem; comments: CommentItem[] }> => {
    const [postRes, commentsRes] = await Promise.all([
        fetch(`https://dummyapi.io/data/v1/post/${postId}`, { headers: { 'app-id': APP_ID } }),
        fetch(`https://dummyapi.io/data/v1/post/${postId}/comment`, { headers: { 'app-id': APP_ID } })
    ]);

    if (!postRes.ok || !commentsRes.ok) {
        throw new Error('Failed to fetch conversation');
    }

    const postData = await postRes.json();
    const commentsData = await commentsRes.json();

    return { post: postData, comments: commentsData.data };
};


const useConversation = (postId: string | undefined) => {
    return useQuery({
        // 1. Query key dinamis: jika postId berubah, query akan dijalankan ulang
        queryKey: ['conversation', postId],

        // 2. Query function memanggil fungsi fetch kita
        //    Tanda seru (!) aman digunakan karena ada opsi `enabled` di bawah
        queryFn: () => fetchConversation(postId!),

        // 3. Opsi `enabled`: query ini hanya akan berjalan jika `postId` ada (bukan undefined)
        enabled: !!postId,
    });
};

export default useConversation;
