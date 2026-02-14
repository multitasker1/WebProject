import React, { createContext, useContext, useState, useEffect } from 'react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'admin' | 'user';
  receiverId: string;
  receiverName: string;
  message: string;
  timestamp: number;
  read: boolean;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (receiverId: string, receiverName: string, message: string, senderRole: 'admin' | 'user') => void;
  getConversation: (userId: string, adminId: string) => Message[];
  markAsRead: (userId: string, role: 'admin' | 'user') => void;
  getUnreadCount: (userId: string, role: 'admin' | 'user') => number;
  getAllUserConversations: (adminId: string) => { userId: string; userName: string; lastMessage: Message; unreadCount: number }[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (
    receiverId: string,
    receiverName: string,
    message: string,
    senderRole: 'admin' | 'user'
  ) => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id || 'admin',
      senderName: currentUser.name || 'Admin',
      senderRole,
      receiverId,
      receiverName,
      message,
      timestamp: Date.now(),
      read: false,
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const getConversation = (userId: string, adminId: string): Message[] => {
    return messages
      .filter(
        msg =>
          (msg.senderId === userId && msg.receiverId === adminId) ||
          (msg.senderId === adminId && msg.receiverId === userId)
      )
      .sort((a, b) => a.timestamp - b.timestamp);
  };

  const markAsRead = (userId: string, role: 'admin' | 'user') => {
    setMessages(prev =>
      prev.map(msg => {
        if (role === 'user' && msg.receiverId === userId && !msg.read) {
          return { ...msg, read: true };
        }
        if (role === 'admin' && msg.senderId === userId && !msg.read) {
          return { ...msg, read: true };
        }
        return msg;
      })
    );
  };

  const getUnreadCount = (userId: string, role: 'admin' | 'user'): number => {
    return messages.filter(msg => {
      if (role === 'user') {
        return msg.receiverId === userId && !msg.read;
      } else {
        return msg.senderId === userId && msg.senderRole === 'user' && !msg.read;
      }
    }).length;
  };

  const getAllUserConversations = (adminId: string) => {
    const userMap = new Map<string, { userId: string; userName: string; lastMessage: Message; unreadCount: number }>();

    messages.forEach(msg => {
      let userId: string;
      let userName: string;

      if (msg.senderId === adminId) {
        userId = msg.receiverId;
        userName = msg.receiverName;
      } else if (msg.receiverId === adminId) {
        userId = msg.senderId;
        userName = msg.senderName;
      } else {
        return;
      }

      const existing = userMap.get(userId);
      
      if (!existing || msg.timestamp > existing.lastMessage.timestamp) {
        const unreadCount = messages.filter(
          m => m.senderId === userId && m.receiverId === adminId && !m.read
        ).length;

        userMap.set(userId, {
          userId,
          userName,
          lastMessage: msg,
          unreadCount,
        });
      }
    });

    return Array.from(userMap.values()).sort(
      (a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp
    );
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        getConversation,
        markAsRead,
        getUnreadCount,
        getAllUserConversations,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};
