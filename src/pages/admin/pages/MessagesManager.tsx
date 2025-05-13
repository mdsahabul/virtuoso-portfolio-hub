
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
  const { messages, setMessages, addMessage, deleteMessage, markMessageAsRead } = useData();
  const [viewingMessage, setViewingMessage] = useState<Message | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch messages from Supabase
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (data) {
          // Map Supabase data to our Message type
          const messagesData = data.map(msg => mapDbMessageToMessage(msg));
          setMessages(messagesData);
          
          // Sync with DataContext
          messagesData.forEach(msg => {
            // Check if message already exists in our context
            const exists = messages.some(m => m.id === msg.id);
            if (!exists) {
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
  }, []);
  
  // Filter messages based on search query
  const filteredMessages = searchQuery 
    ? messages.filter(message => 
        message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.message.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setIsDeleting(true);
      
      try {
        // Delete from Supabase
        const { error } = await supabase
          .from('messages')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        // Delete from local state
        deleteMessage(id);
        
        // Close message view if we're viewing the deleted message
        if (viewingMessage && viewingMessage.id === id) {
          setViewingMessage(null);
        }
        
        toast.success('Message deleted successfully');
      } catch (error) {
        console.error('Error deleting message:', error);
        toast.error('Failed to delete message');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  const handleMarkAsRead = async (id: string) => {
    try {
      // Update in Supabase
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update in local state
      markMessageAsRead(id);
      
      toast.success('Message marked as read');
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast.error('Failed to mark message as read');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Messages</h2>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {filteredMessages.length > 0 ? (
            <div className="overflow-x-auto bg-white rounded-lg border">
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
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMessages.map((message) => (
                    <tr 
                      key={message.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${!message.read ? 'font-semibold' : ''}`}
                      onClick={() => {
                        setViewingMessage(message);
                        if (!message.read) {
                          handleMarkAsRead(message.id);
                        }
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className={`text-sm ${!message.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                              {message.name}
                            </div>
                            <div className="text-sm text-gray-500">{message.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${!message.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                          {message.subject}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(message.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          message.read ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {message.read ? 'Read' : 'Unread'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(message.id);
                          }}
                          className="text-red-600 hover:text-red-900"
                          disabled={isDeleting}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border">
              <Mail className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No messages</h3>
              <p className="mt-1 text-sm text-gray-500">
                No messages found {searchQuery && 'with the current search filter'}.
              </p>
            </div>
          )}
        </>
      )}
      
      {/* Message Detail Modal */}
      {viewingMessage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">{viewingMessage.subject}</h3>
                <button 
                  onClick={() => setViewingMessage(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">From</p>
                  <p className="mt-1">{viewingMessage.name} ({viewingMessage.email})</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="mt-1">{new Date(viewingMessage.date).toLocaleString()}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Message</p>
                  <div className="mt-1 p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
                    {viewingMessage.message}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleDelete(viewingMessage.id)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  disabled={isDeleting}
                >
                  <Trash2 size={16} className="mr-2" />
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
