import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../api/client';
import type { CommentItem, InboxItem } from '../types/inbox.ts';

const fetchConversation = async (
  postId: string
): Promise<{ post: InboxItem; comments: CommentItem[] }> => {
  const [postData, commentsData, users] = await Promise.all([
    fetchWithAuth(`/posts/${postId}`),
    fetchWithAuth(`/comments?postId=${postId}`),
    fetchWithAuth('/users')
  ]);

  const postUser = users.find((u: any) => u.id === postData.userId) || users[0];
  const postUserNames = postUser.name.split(' ');

  const post: InboxItem = {
    id: postData.id.toString(),
    text: postData.body,
    publishDate: new Date().toISOString(),
    subject: postData.title,
    read: true,
    owner: {
      id: postUser.id.toString(),
      firstName: postUserNames[0],
      lastName: postUserNames.slice(1).join(' '),
      picture: `https://i.pravatar.cc/150?u=${postUser.email}`,
    }
  };

  const comments: CommentItem[] = commentsData.map((c: any, index: number) => ({
    id: c.id.toString(),
    message: c.body,
    publishDate: new Date(Date.now() - (index + 1) * 600000).toISOString(),
    owner: {
      id: `c-user-${c.email}`,
      firstName: c.name.split(' ')[0],
      lastName: c.name.split(' ').slice(1).join(' '),
      picture: `https://i.pravatar.cc/150?u=${c.email}`,
    }
  }));

  return { post, comments };
};

const useConversation = (postId: string | undefined) => {
  return useQuery({
    queryKey: ['conversation', postId],
    queryFn: () => fetchConversation(postId!),
    enabled: !!postId,
  });
};

export default useConversation;
