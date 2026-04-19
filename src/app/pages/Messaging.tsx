import { useState } from "react";
import { storage } from "../utils/storage";
import { Send, Search, Loader2 } from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
}

export function Messaging() {
  const currentUser = storage.getCurrentUser();
  const [selectedConversation, setSelectedConversation] = useState<string | null>('conv1');
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
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
  ]);

  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>({
    conv1: [
      { id: '1', sender: 'Sara Noor', content: 'Hi! I saw you offered to help with my portfolio.', time: '10:30 AM', isMe: false },
      { id: '2', sender: 'You', content: 'Yes! I\'d be happy to help. Can you share the link?', time: '10:32 AM', isMe: true },
      { id: '3', sender: 'Sara Noor', content: 'Thanks for offering to help!', time: '10:35 AM', isMe: false },
    ],
    conv2: [
      { id: '1', sender: 'John Doe', content: 'I can help with your React question', time: 'Yesterday', isMe: false },
    ],
  });

  const currentMessages = selectedConversation ? messagesMap[selectedConversation] || [] : [];

  const callChatAPI = async (message: string): Promise<string> => {
    try {
      const response = await fetch('https://rumix-ai.vercel.app/api/chat/deepseek/v3?p=Hy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      if (data.success && data.response) {
        // Clean up any escaped unicode characters
        return data.response.replace(/\\ud83d/g, '😊').replace(/\\ude0a/g, '');
      }
      
      throw new Error('Invalid API response');
    } catch (error) {
      console.error('API Error:', error);
      return "Sorry, I'm having trouble connecting right now. Please try again later.";
    }
  };

  const handleSend = async () => {
    if (!messageText.trim() || !selectedConversation || isLoading) return;

    const newMessageId = Date.now().toString();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMessage: Message = {
      id: newMessageId,
      sender: 'You',
      content: messageText,
      time: currentTime,
      isMe: true,
    };

    setMessagesMap(prev => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), userMessage],
    }));

    // Update conversation last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation 
          ? { ...conv, lastMessage: messageText, timestamp: 'Just now' }
          : conv
      )
    );

    const userMessageText = messageText;
    setMessageText('');
    setIsLoading(true);

    // Get AI response
    const aiResponse = await callChatAPI(userMessageText);

    // Add AI response
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: conversations.find(c => c.id === selectedConversation)?.name || 'AI Assistant',
      content: aiResponse,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: false,
    };

    setMessagesMap(prev => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), aiMessage],
    }));

    // Update conversation with AI response
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation 
          ? { ...conv, lastMessage: aiResponse, timestamp: 'Just now', unread: false }
          : conv
      )
    );

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
              {currentMessages.map((msg) => (
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
                    <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                    <p className={`mt-1 text-xs ${msg.isMe ? 'text-[#ccfbf1]' : 'text-[#6b7280]'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-md rounded-lg border border-[#e5e7eb] bg-white px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-[#0d9488]" />
                      <p className="text-sm text-[#6b7280]">AI is typing...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-[#e5e7eb] bg-white p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1 rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] placeholder-[#6b7280] focus:border-[#0d9488] focus:outline-none focus:ring-1 focus:ring-[#0d9488] disabled:bg-[#f3f4f6] disabled:text-[#9ca3af]"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !messageText.trim()}
                className="flex items-center gap-2 rounded-md bg-[#0d9488] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f766e] disabled:bg-[#9ca3af] disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
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