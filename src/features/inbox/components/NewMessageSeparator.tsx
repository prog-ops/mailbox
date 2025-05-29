const NewMessageSeparator = ({ isAtBottom }: { isAtBottom?: boolean }) => {
    // Mine: color logic
    const lineColor = isAtBottom ? 'border-[#E5A443]' : 'border-[#D2F2EA]';
    const textColor = isAtBottom ? 'text-[#E5A443]' : 'text-[#43B78D]';
    return (
        <div className="flex items-center my-4">
            <div className={`flex-grow border-t ${lineColor}`}></div>
            <span className={`flex-shrink-0 mx-4 font-semibold text-sm ${textColor}`}>
                New Message
            </span>
            <div className={`flex-grow border-t ${lineColor}`}></div>
        </div>
    );
};

export default NewMessageSeparator;
