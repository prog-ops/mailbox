import { useState, useEffect } from 'react';
import type {InboxItem} from "../types/inbox.ts";

// Ganti dengan App ID Anda yang didapat dari dummyapi.io
const APP_ID = '68315676b43cb9e04e38ea1e';

const useInbox = () => {
    const [items, setItems] = useState<InboxItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchInboxItems = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://dummyapi.io/data/v1/post?limit=10', {
                    headers: { 'app-id': APP_ID },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data from DummyAPI');
                }

                const { data } = await response.json();

                // Menambahkan data 'subject' dan 'read' secara acak untuk demo
                const processedData = data.map((item: any, index: number) => ({
                    ...item,
                    subject: `Re: Project Update #${Math.floor(10000 + Math.random() * 90000)}`,
                    read: index % 3 !== 0, // Membuat beberapa item belum terbaca
                }));

                setItems(processedData);

            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchInboxItems();
    }, []);

    return { items, loading, error };
};

export default useInbox;
