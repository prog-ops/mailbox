import React from 'react';
import {format} from 'date-fns';
import type {InboxItem} from "../../../types/inbox.ts";
import { Link } from 'react-router-dom';

const Avatar: React.FC<{ owner: InboxItem['owner'] }> = ({owner}) => {
    if (owner.picture) {
        return (
            <img
                src={owner.picture}
                alt={`${owner.firstName} ${owner.lastName}`}
                className="w-10 h-10 rounded-full object-cover"
            />
        );
    }
    // Fallback jika tidak ada gambar
    const initial = owner.firstName.charAt(0).toUpperCase();
    return (
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {initial}
        </div>
    );
};

// Props untuk komponen list item
interface InboxListItemProps {
    item: InboxItem;
}

const InboxListItem: React.FC<InboxListItemProps> = ({item}) => {
    return (
        <Link to={`/conversation/${item.id}`}>

        <div className="flex gap-x-3 p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
            {/* Kolom Avatar */}
            <Avatar owner={item.owner}/>

            {/* Kolom Konten Pesan */}
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <span className="text-[#2F80ED] font-semibold">{item.subject}</span>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-4">
            {format(new Date(item.publishDate), 'MM/dd/yyyy HH:mm')}
          </span>
                </div>
                <p className="font-semibold text-[#4F4F4F]">{`${item.owner.firstName} ${item.owner.lastName}`}</p>
                <p className="text-[#828282] text-sm truncate">{item.text}</p>
            </div>

            {/* Kolom Indikator Belum Dibaca */}
            <div className="w-4 flex items-center justify-center">
                {!item.read && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
            </div>
        </div>
        </Link>
    );
};

export default InboxListItem;
