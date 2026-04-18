import { useState } from "react";
import { storage } from "../utils/storage";
import { Send, Search } from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export function Messaging() {
  const currentUser = storage.getCurrentUser();
  const [selectedConversation, setSelectedConversation] = useState<string | null>('conv1');
  const [messageText, setMessageText] = useState('');

  const conversations: Conversation[] = [
    {
      id: 'conv1',
      name: 'Sara Noor',
      lastMessage: 'Thanks for offering to help!',
      timestamp: '2 hours ago',
      unread: true,
    },
    {
      id: 'conv2',
      name: 'John Doe',
      lastMessage: 'I can help with your React question',
      timestamp: '1 day ago',
      unread: false,
    },
  ];

  const messages = selectedConversation === 'conv1' ? [
    { id: '1', sender: 'Sara Noor', content: 'Hi! I saw you offered to help with my portfolio.', time: '10:30 AM', isMe: false },
    { id: '2', sender: 'You', content: 'Yes! I\'d be happy to help. Can you share the link?', time: '10:32 AM', isMe: true },
    { id: '3', sender: 'Sara Noor', content: 'Thanks for offering to help!', time: '10:35 AM', isMe: false },
  ] : [
    { id: '1', sender: 'John Doe', content: 'I can help with your React question', time: 'Yesterday', isMe: false },
  ];

  const handleSend = () => {
    if (!messageText.trim()) return;
    setMessageText('');
  };

  return (
    <div className="flex h-[calc(100vh-0px)] bg-[#f9fafb]">
      {/* Conversations List */}
      <div className="w-80 border-r border-[#e5e7eb] bg-white">
        <div className="border-b border-[#e5e7eb] p-4">
          <h2 className="mb-4 text-lg font-semibold text-[#111827]">Messages</h2>
          <div className="flex items-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-3 py-2">
            <Search className="h-4 w-4 text-[#6b7280]" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="flex-1 text-sm text-[#111827] placeholder-[#6b7280] focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full border-b border-[#e5e7eb] p-4 text-left transition-colors ${
                selectedConversation === conv.id
                  ? 'bg-[#f0fdfa]'
                  : 'hover:bg-[#f9fafb]'
              }`}
            >
              <div className="mb-1 flex items-start justify-between">
                <span className="font-medium text-[#111827]">{conv.name}</span>
                <span className="text-xs text-[#6b7280]">{conv.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="truncate text-sm text-[#6b7280]">{conv.lastMessage}</p>
                {conv.unread && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-[#0d9488]" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="border-b border-[#e5e7eb] bg-white p-4">
            <h3 className="font-semibold text-[#111827]">
              {conversations.find(c => c.id === selectedConversation)?.name}
            </h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md rounded-lg px-4 py-2 ${
                      msg.isMe
                        ? 'bg-[#0d9488] text-white'
                        : 'bg-white border border-[#e5e7eb] text-[#111827]'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`mt-1 text-xs ${msg.isMe ? 'text-[#ccfbf1]' : 'text-[#6b7280]'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-[#e5e7eb] bg-white p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
              />
              <button
                onClick={handleSend}
                className="flex items-center gap-2 rounded-md bg-[#0d9488] px-4 py-2 text-sm font-medium text-white hover:bg-[#0f766e]"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-[#6b7280]">
          Select a conversation to start messaging
        </div>
      )}
    </div>
  );
}
