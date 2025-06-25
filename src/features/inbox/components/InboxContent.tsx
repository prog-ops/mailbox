import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress } from '@mui/material';
import useInbox from '../../../hooks/useInbox.ts';
import type { InboxItem } from '../../../types/inbox.ts';
import InboxListItem from './InboxListItem';

const InboxContent = () => {
  const { data: items, isLoading, error } = useInbox();

  const renderList = () => {
    if (isLoading) {
      return (
        <div className="mt-16 flex justify-center">
          <CircularProgress color="inherit" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="mt-16 text-center text-red-500">
          Error: {error.message}
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        {items?.map((item: InboxItem) => (
          <InboxListItem item={item} key={item.id} />
        ))}
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Search Bar */}
      <div className="sticky top-0 border-gray-200 border-b bg-white p-4">
        <div className="relative w-full">
          <input
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-10 pl-4 text-[#4F4F4F] placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
            type="text"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <SearchIcon className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Daftar Inbox */}
      {renderList()}
    </div>
  );
};

export default InboxContent;
