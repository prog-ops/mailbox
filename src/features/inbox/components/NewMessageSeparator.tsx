const NewMessageSeparator = () => {
    return (
        <div className="flex items-center my-4">
            <div className="flex-grow border-t border-red-500"></div>
            <span className="flex-shrink-0 mx-4 text-red-500 font-semibold text-sm">
        New Message
      </span>
            <div className="flex-grow border-t border-red-500"></div>
        </div>
    );
};

export default NewMessageSeparator;
