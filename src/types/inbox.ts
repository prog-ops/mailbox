export interface InboxItemOwner {
    id: string;
    firstName: string;
    lastName: string;
    picture: string; // URL avatar
}

export interface InboxItem {
    id: string;
    text: string; // Akan kita gunakan sebagai preview pesan
    publishDate: string; // Timestamp
    owner: InboxItemOwner;
    // Kita akan tambahkan properti ini secara manual untuk UI
    subject?: string;
    read: boolean;
}

// Conversation detail
export interface CommentItem {
    id: string;
    message: string;
    publishDate: string;
    owner: InboxItemOwner;
    replyTo?: string; // Mine
}
