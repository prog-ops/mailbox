import { useQuery } from '@tanstack/react-query';
import type {InboxItem} from "../types/inbox.ts";

// Ganti dengan App ID Anda yang didapat dari dummyapi.io
const APP_ID = '68315676b43cb9e04e38ea1e';

const fetchInboxItems = async () => {
    const response = await fetch('https://dummyapi.io/data/v1/post?limit=20', {
        headers: { 'app-id': APP_ID },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const { data } = await response.json();
    return data.map((item: any, index: number) => ({
        ...item,
        subject: `Re: Project Update #${Math.floor(10000 + Math.random() * 90000)}`,
        read: index % 3 !== 0,
    }));
};

const useInbox = () => {
    // Tambahkan <InboxItem[]> untuk memberi tahu React Query tipe data yang kembali
    return useQuery<InboxItem[]>({
        queryKey: ['inboxItems'], // Kunci unik untuk cache data ini
        queryFn: fetchInboxItems,
    });
};

export default useInbox;
