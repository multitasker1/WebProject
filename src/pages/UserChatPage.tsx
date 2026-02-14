import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../contexts/ChatContext';

const UserChatPage = () => {
  const { user } = useAuth();
  const { getConversation, getUnreadCount } = useChat();
  const [showChat, setShowChat] = useState(false);

  const adminId = 'admin-1';
  const unreadCount = getUnreadCount(user?.id || '', 'user');
  const conversation = getConversation(user?.id || '', adminId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Messages
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Chat with admin and view messages
          </p>
        </div>

        {/* Unread Messages Indicator */}
        {unreadCount > 0 && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">
                You have {unreadCount} unread message{unreadCount > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}

        {/* Chat Interface */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {!showChat ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Admin Chat
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {conversation.length > 0
                  ? `You have ${conversation.length} message${conversation.length > 1 ? 's' : ''} in this conversation`
                  : 'Start a conversation with the admin'}
              </p>
              <button
                onClick={() => setShowChat(true)}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
              >
                Open Chat
              </button>
            </div>
          ) : (
            <ChatBox
              receiverId={adminId}
              receiverName="Admin"
              receiverRole="admin"
              onClose={() => setShowChat(false)}
            />
          )}
        </div>

        {/* Message History */}
        {conversation.length > 0 && !showChat && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Messages
            </h2>
            <div className="space-y-3">
              {conversation.slice(-5).reverse().map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg ${
                    msg.senderRole === 'admin'
                      ? 'bg-blue-50 dark:bg-blue-900'
                      : 'bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">
                      {msg.senderName}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(msg.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserChatPage;
