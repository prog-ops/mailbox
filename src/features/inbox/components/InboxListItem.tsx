import { format } from 'date-fns';
import type React from 'react';
import { Link } from 'react-router-dom';
import type { InboxItem } from '../../../types/inbox.ts';

const Avatar: React.FC<{ owner: InboxItem['owner'] }> = ({ owner }) => {
  if (owner.picture) {
    return (
      <img
        alt={`${owner.firstName} ${owner.lastName}`}
        className="h-10 w-10 rounded-full object-cover"
        src={owner.picture}
      />
    );
  }
  // Fallback jika tidak ada gambar
  const initial = owner.firstName.charAt(0).toUpperCase();
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
      {initial}
    </div>
  );
};

// Props untuk komponen list item
interface InboxListItemProps {
  item: InboxItem;
}

const InboxListItem: React.FC<InboxListItemProps> = ({ item }) => {
  return (
    <Link to={`/conversation/${item.id}`}>
      <div className="flex cursor-pointer gap-x-3 border-gray-200 border-b p-4 hover:bg-gray-100">
        {/* Kolom Avatar */}
        <Avatar owner={item.owner} />

        {/* Kolom Konten Pesan */}
        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <span className="font-semibold text-[#2F80ED]">{item.subject}</span>
            <span className="ml-4 flex-shrink-0 text-gray-500 text-xs">
              {format(new Date(item.publishDate), 'MM/dd/yyyy HH:mm')}
            </span>
          </div>
          <p className="font-semibold text-[#4F4F4F]">{`${item.owner.firstName} ${item.owner.lastName}`}</p>
          <p className="truncate text-[#828282] text-sm">{item.text}</p>
        </div>

        {/* Kolom Indikator Belum Dibaca */}
        <div className="flex w-4 items-center justify-center">
          {!item.read && <div className="h-2 w-2 rounded-full bg-red-500" />}
        </div>
      </div>
    </Link>
  );
};

export default InboxListItem;
