import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../api/client';
import type { InboxItem } from '../types/inbox.ts';

const fetchInboxItems = async () => {
  const [posts, users] = await Promise.all([
    fetchWithAuth('/posts?_limit=20'),
    fetchWithAuth('/users')
  ]);
  
  return posts.map((post: any, index: number) => {
    const user = users.find((u: any) => u.id === post.userId) || users[0];
    const names = user.name.split(' ');
    
    return {
      id: post.id.toString(),
      text: post.body,
      publishDate: new Date(Date.now() - index * 3600000).toISOString(),
      subject: post.title,
      read: index % 3 !== 0,
      owner: {
        id: user.id.toString(),
        firstName: names[0],
        lastName: names.slice(1).join(' '),
        picture: `https://i.pravatar.cc/150?u=${user.email}`,
      }
    };
  });
};

const useInbox = () => {
  // Tambahkan <InboxItem[]> untuk memberi tahu React Query tipe data yang kembali
  return useQuery<InboxItem[]>({
    queryKey: ['inboxItems'], // Kunci unik untuk cache data ini
    queryFn: fetchInboxItems,
  });
};

export default useInbox;
