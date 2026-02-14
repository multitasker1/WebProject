import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../context/AuthContext';

interface ChatBoxProps {
  receiverId: string;
  receiverName: string;
  receiverRole: 'admin' | 'user';
  onClose?: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ receiverId, receiverName, receiverRole, onClose }) => {
  const { user } = useAuth();
  const { getConversation, sendMessage, markAsRead } = useChat();
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUserId = user?.id || 'admin';
  const currentUserRole = user?.role || 'admin';

  useEffect(() => {
    const conv = getConversation(receiverId, currentUserId);
    setConversation(conv);
    markAsRead(receiverId, currentUserRole as 'admin' | 'user');
  }, [receiverId, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Refresh conversation every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const conv = getConversation(receiverId, currentUserId);
      setConversation(conv);
    }, 2000);

    return () => clearInterval(interval);
  }, [receiverId, currentUserId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    sendMessage(receiverId, receiverName, message, currentUserRole as 'admin' | 'user');
    setMessage('');

    // Refresh conversation
    setTimeout(() => {
      const conv = getConversation(receiverId, currentUserId);
      setConversation(conv);
    }, 100);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ' ' +
             date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col h-[600px] max-h-[80vh]">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-semibold">
            {receiverName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold">{receiverName}</h3>
            <p className="text-xs text-white/80 capitalize">{receiverRole}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {conversation.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <>
            {conversation.map((msg) => {
              const isCurrentUser = msg.senderId === currentUserId;
              
              return (
                <div
                  key={msg.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      isCurrentUser
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={`text-xs font-semibold ${isCurrentUser ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                        {msg.senderName}
                      </span>
                      <span className={`text-[10px] ${isCurrentUser ? 'text-white/70' : 'text-gray-400 dark:text-gray-500'}`}>
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm break-words">{msg.message}</p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span>Send</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
