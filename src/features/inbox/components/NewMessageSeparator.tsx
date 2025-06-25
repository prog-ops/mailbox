const NewMessageSeparator = ({ isAtBottom }: { isAtBottom?: boolean }) => {
  // Mine: color logic
  const lineColor = isAtBottom ? 'border-[#E5A443]' : 'border-[#D2F2EA]';
  const textColor = isAtBottom ? 'text-[#E5A443]' : 'text-[#43B78D]';
  return (
    <div className="my-4 flex items-center">
      <div className={`flex-grow border-t ${lineColor}`} />
      <span className={`mx-4 flex-shrink-0 font-semibold text-sm ${textColor}`}>
        New Message
      </span>
      <div className={`flex-grow border-t ${lineColor}`} />
    </div>
  );
};

export default NewMessageSeparator;
