
import { useState, useEffect } from 'react';
import { Trash2, Mail, Eye, X } from 'lucide-react';
import { useData, Message } from '@/context/DataContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { mapDbMessageToMessage } from '@/types/appTypes';

interface MessagesManagerProps {
  searchQuery: string;
}

const MessagesManager = ({ searchQuery }: MessagesManagerProps) => {
  const { messages, deleteMessage, markMessageAsRead, addMessage } = useData();
  const [viewingMessage, setViewingMessage] = useState<Message | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch messages from Supabase
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all messages from the database
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data) {
          // Map database messages to our application Message type
          const mappedMessages = data.map(mapDbMessageToMessage);
          
          // Update context with messages from database that don't exist in the current state
          mappedMessages.forEach(msg => {
            if (!messages.find(m => m.id === msg.id)) {
              addMessage({
                name: msg.name,
                email: msg.email,
                subject: msg.subject,
                message: msg.message
              }, msg.id);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to load messages');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  // Only re-run when component mounts, not on every render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Filter messages based on search query
  const filteredMessages = searchQuery
    ? messages.filter(
        message =>
          message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.message.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  const handleViewMessage = async (message: Message) => {
    setViewingMessage(message);
    setIsViewModalOpen(true);
    
    // If message is unread, mark it as read
    if (!message.read) {
      await markMessageAsRead(message.id);
      
      // Also update in database
      try {
        const { error } = await supabase
          .from('messages')
          .update({ read: true })
          .eq('id', message.id);
          
        if (error) throw error;
      } catch (error) {
        console.error('Error marking message as read:', error);
        toast.error('Failed to update message status');
      }
    }
  };

  const handleDeleteMessage = async (id: string) => {
    // Confirm deletion
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        // Delete from database first
        const { error } = await supabase
          .from('messages')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        
        // If successful, remove from local state
        deleteMessage(id);
        toast.success('Message deleted successfully');
      } catch (error) {
        console.error('Error deleting message:', error);
        toast.error('Failed to delete message');
      }
    }
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingMessage(null);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Messages</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-10">
          <Mail className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No messages</h3>
          <p className="mt-1 text-gray-500">No messages found in your inbox.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <tr key={message.id} className={message.read ? "" : "font-semibold"}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{message.name}</div>
                        <div className="text-sm text-gray-500">{message.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{message.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(message.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      message.read ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}>
                      {message.read ? "Read" : "New"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewMessage(message)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Message View Modal */}
      {isViewModalOpen && viewingMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Message Details</h3>
                <button onClick={closeViewModal} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">From</p>
                  <p className="mt-1">{viewingMessage.name} ({viewingMessage.email})</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Subject</p>
                  <p className="mt-1">{viewingMessage.subject}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="mt-1">{new Date(viewingMessage.date).toLocaleString()}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Message</p>
                  <div className="mt-1 p-4 bg-gray-50 rounded-md">
                    <p className="whitespace-pre-line">{viewingMessage.message}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={closeViewModal}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    closeViewModal();
                    handleDeleteMessage(viewingMessage.id);
                  }}
                  className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesManager;
