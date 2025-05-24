import SearchIcon from '@mui/icons-material/Search';

const InboxContent = () => {
    return (
        <div className="p-6">
            {/* Container untuk search bar */}
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search"
                    // Styling untuk input field agar sesuai gambar
                    className="w-full bg-[#3c4043] border border-gray-500 rounded-lg py-2 pl-4 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {/* Search Icon */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <SearchIcon className="text-gray-400" />
                </div>
            </div>

            {/* Chat list */}
            <div className="mt-6">
                {/* Inbox content */}
            </div>
        </div>
    );
};

export default InboxContent;
