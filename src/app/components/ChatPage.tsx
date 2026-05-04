import { ArrowLeft, Send, Paperclip, User, Clock, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ChatPageProps {
  onNavigate: (page: string) => void;
}

interface Message {
  id: number;
  sender: "user" | "admin" | "other";
  senderName: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function ChatPage({ onNavigate }: ChatPageProps) {
  const [selectedChat, setSelectedChat] = useState<"admin" | number | null>(
    "admin",
  );
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Message storage for each conversation
  const [conversationMessages, setConversationMessages] = useState<
    Record<string, Message[]>
  >({
    admin: [
      {
        id: 1,
        sender: "admin",
        senderName: "Nerch Support",
        message: "Hello! Welcome to Nerch. How can we help you today?",
        timestamp: new Date(2026, 4, 1, 10, 0),
        read: true,
      },
      {
        id: 2,
        sender: "user",
        senderName: "You",
        message: "Hi, I have a question about NFT delivery time",
        timestamp: new Date(2026, 4, 1, 10, 5),
        read: true,
      },
      {
        id: 3,
        sender: "admin",
        senderName: "Nerch Support",
        message:
          "NFT certificates are minted instantly upon payment confirmation. Physical items are shipped within 2-3 business days.",
        timestamp: new Date(2026, 4, 1, 10, 7),
        read: true,
      },
    ],
    "1": [
      {
        id: 1,
        sender: "other",
        senderName: "Alice Johnson",
        message: "Hey! I saw your NFT collection",
        timestamp: new Date(2026, 4, 3, 9, 30),
        read: true,
      },
      {
        id: 2,
        sender: "user",
        senderName: "You",
        message: "Thanks! Glad you like it",
        timestamp: new Date(2026, 4, 3, 9, 35),
        read: true,
      },
      {
        id: 3,
        sender: "other",
        senderName: "Alice Johnson",
        message: "Thanks for the NFT! Love it 🎉",
        timestamp: new Date(2026, 4, 3, 9, 45),
        read: true,
      },
    ],
    "2": [
      {
        id: 1,
        sender: "other",
        senderName: "Bob Smith",
        message: "Hi, interested in your HFeastHora NFT",
        timestamp: new Date(2026, 4, 2, 14, 20),
        read: true,
      },
      {
        id: 2,
        sender: "user",
        senderName: "You",
        message: "Sure, what price are you thinking?",
        timestamp: new Date(2026, 4, 2, 14, 25),
        read: true,
      },
      {
        id: 3,
        sender: "other",
        senderName: "Bob Smith",
        message: "Can we discuss the price?",
        timestamp: new Date(2026, 4, 2, 14, 30),
        read: true,
      },
    ],
    "3": [],
    "4": [],
    "5": [],
  });

  const messages = conversationMessages[String(selectedChat)] || [];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const chatId = String(selectedChat);
    const currentMessages = conversationMessages[chatId] || [];

    const newMessage: Message = {
      id: currentMessages.length + 1,
      sender: "user",
      senderName: "You",
      message: message.trim(),
      timestamp: new Date(),
      read: false,
    };

    setConversationMessages((prev) => ({
      ...prev,
      [chatId]: [...currentMessages, newMessage],
    }));
    setMessage("");

    // Simulate response from other user or admin
    setTimeout(() => {
      const chat = allChats.find((c) => c.id === selectedChat);
      const responseSender = selectedChat === "admin" ? "admin" : "other";
      const responseName = chat?.name || "User";

      const response: Message = {
        id: currentMessages.length + 2,
        sender: responseSender,
        senderName: responseName,
        message:
          selectedChat === "admin"
            ? "Thank you for your message. Our team will get back to you shortly!"
            : "Thanks for reaching out! I'll get back to you soon.",
        timestamp: new Date(),
        read: false,
      };

      setConversationMessages((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), response],
      }));
    }, 2000);
  };

  const handleSelectChat = (chatId: "admin" | number) => {
    setSelectedChat(chatId);
    // Initialize empty conversation if not exists
    if (!conversationMessages[String(chatId)]) {
      setConversationMessages((prev) => ({
        ...prev,
        [String(chatId)]: [],
      }));
    }
  };

  const allChats = [
    {
      id: "admin",
      name: "Nerch Support",
      lastMessage: "NFT certificates are minted instantly...",
      timestamp: "10:07",
      unread: 0,
      avatar: "🛒",
      online: true,
    },
    {
      id: 1,
      name: "Alice Johnson",
      lastMessage: "Thanks for the NFT! Love it 🎉",
      timestamp: "09:45",
      unread: 2,
      avatar: "👩",
      online: true,
    },
    {
      id: 2,
      name: "Bob Smith",
      lastMessage: "Can we discuss the price?",
      timestamp: "Yesterday",
      unread: 0,
      avatar: "👨",
      online: false,
    },
    {
      id: 3,
      name: "Charlie Brown",
      lastMessage: "Check out my new collection",
      timestamp: "Yesterday",
      unread: 1,
      avatar: "🧑",
      online: true,
    },
    {
      id: 4,
      name: "Diana Prince",
      lastMessage: "Interested in collaboration",
      timestamp: "2 days ago",
      unread: 0,
      avatar: "👸",
      online: false,
    },
    {
      id: 5,
      name: "Eve Wilson",
      lastMessage: "Great marketplace!",
      timestamp: "3 days ago",
      unread: 0,
      avatar: "🙋‍♀️",
      online: false,
    },
  ];

  const filteredChats = allChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-full bg-[#f5f5f0] flex">
      {/* Chat List Sidebar - Desktop */}
      <div className="hidden md:block w-80 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold mb-3">Messages</h2>
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent text-sm"
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-200px)]">
          {filteredChats.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              No users found
            </div>
          ) : (
            filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleSelectChat(chat.id as "admin" | number)}
                className={`w-full p-4 hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                  selectedChat === chat.id ? "bg-green-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-[#2d4a2b] rounded-full flex items-center justify-center text-xl">
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-500">
                        {chat.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 bg-[#2d4a2b] text-white rounded-full flex items-center justify-center text-xs">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <button
            onClick={() => onNavigate("home")}
            aria-label="Back to home"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 bg-[#2d4a2b] rounded-full flex items-center justify-center text-xl">
            {allChats.find((c) => c.id === selectedChat)?.avatar || "🛒"}
          </div>
          <div className="flex-1">
            <h2 className="font-bold">
              {allChats.find((c) => c.id === selectedChat)?.name || "Chat"}
            </h2>
            <div
              className={`text-xs flex items-center gap-1 ${
                allChats.find((c) => c.id === selectedChat)?.online
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  allChats.find((c) => c.id === selectedChat)?.online
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              />
              {allChats.find((c) => c.id === selectedChat)?.online
                ? "Online"
                : "Offline"}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                  msg.sender === "user"
                    ? "bg-[#2d4a2b] text-white"
                    : "bg-gray-300"
                }`}
              >
                {msg.sender === "user" ? "👤" : "🛒"}
              </div>
              <div
                className={`max-w-[70%] ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    msg.sender === "user"
                      ? "bg-[#2d4a2b] text-white rounded-tr-none"
                      : "bg-white border border-gray-200 rounded-tl-none"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
                <div className="flex items-center gap-2 mt-1 px-2">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {msg.timestamp.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Attach file"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              aria-label="Send message"
              disabled={!message.trim()}
              className="w-12 h-12 bg-[#2d4a2b] text-white rounded-full flex items-center justify-center hover:bg-[#3d5a3b] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Typically replies within a few minutes
          </p>
        </div>
      </div>
    </div>
  );
}
