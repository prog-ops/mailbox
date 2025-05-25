import SearchIcon from '@mui/icons-material/Search';
import InboxListItem from './InboxListItem';
import {CircularProgress} from '@mui/material';
import useInbox from "../../../hooks/useInbox.ts";

const InboxContent = () => {
    const {items, loading, error} = useInbox();

    const renderList = () => {
        if (loading) {
            return (
                <div className="flex justify-center mt-16">
                    <CircularProgress color="inherit"/>
                </div>
            );
        }

        if (error) {
            return <div className="text-center mt-16 text-red-500">Error: {error.message}</div>;
        }

        return (
            <div className="flex flex-col">
                {items.map((item) => (
                    <InboxListItem key={item.id} item={item}/>
                ))}
            </div>
        );
    };

    return (
        <div className="h-full overflow-y-auto">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-600 sticky top-0 bg-[#282c34]">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-[#3c4043] border border-gray-500 rounded-lg py-2 pl-4 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <SearchIcon className="text-gray-400"/>
                    </div>
                </div>
            </div>

            {/* Daftar Inbox */}
            {renderList()}
        </div>
    );
};

export default InboxContent;
