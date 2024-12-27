export default function ChatsPage() {
  return (
    <div className="flex h-full flex-col rounded-none border-0">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Messages will go here */}
        <div className="flex h-full items-center justify-center">
          <p className="text-center text-sm text-muted-foreground">Select a conversation to start messaging</p>
        </div>
      </div>
      <div className="border-t p-4">
        {/* Message input will go here */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            disabled
          />
          <button
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            disabled
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
