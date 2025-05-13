
import { useState, useEffect } from 'react';
import { Trash2, Mail, Eye, X } from 'lucide-react';
import { useData, Message } from '../../../context/DataContext';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { mapDbMessageToMessage } from '@/types/appTypes';

interface MessagesManagerProps {
  searchQuery: string;
}

const MessagesManager = ({ searchQuery }: MessagesManagerProps) => {
  const { messages, deleteMessage, markMessageAsRead, addMessage } = useData();
  const [viewingMessage, setViewingMessage] = useState<Message | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load messages from Supabase when component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          // Map database messages to our application Message type
          const mappedMessages = data.map(mapDbMessageToMessage);
          
          // Update context with messages from database that don't exist in the current state
          mappedMessages.forEach(msg => {
            if (!messages.find(m => m.id === msg.id)) {
              // Use addMessage from context
              addMessage({
                name: msg.name,
                email: msg.email,
                subject: msg.subject,
                message: msg.message
              });
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
  }, [messages, addMessage]);
  
  // Filter messages based on search query
  const filteredMessages = searchQuery 
    ? messages.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.message.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  // Sort messages by date (newest first) and unread messages at the top
  const sortedMessages = [...filteredMessages].sort((a, b) => {
    if (a.read !== b.read) return a.read ? 1 : -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const openViewModal = async (message: Message) => {
    setViewingMessage(message);
    setIsViewModalOpen(true);
    
    // Mark as read when viewing - both in Supabase and context
    if (!message.read) {
      try {
        const { error } = await supabase
          .from('messages')
          .update({ read: true })
          .eq('id', message.id);
          
        if (error) {
          throw error;
        }
        
        // Also update in context
        markMessageAsRead(message.id);
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    }
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingMessage(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        // Delete from Supabase
        const { error } = await supabase
          .from('messages')
          .delete()
          .eq('id', id);
          
        if (error) {
          throw error;
        }
        
        // Also delete from context
        deleteMessage(id);
        toast.success('Message deleted successfully');
        
        // Close modal if the deleted message was being viewed
        if (viewingMessage && viewingMessage.id === id) {
          closeViewModal();
        }
      } catch (error) {
        toast.error('An error occurred while deleting the message');
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Messages</h2>
        <Badge variant="outline" className="px-2 py-1">
          {messages.filter(m => !m.read).length} Unread
        </Badge>
      </div>
      
      {/* Messages List */}
      <div className="space-y-4">
        {sortedMessages.map(message => (
          <Card 
            key={message.id}
            className={`transition-all hover:shadow-md ${!message.read ? 'border-l-4 border-l-blue-500' : ''}`}
          >
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 flex-grow">
                  <div className="flex justify-between items-center">
                    <h3 className={`text-lg font-medium flex items-center gap-2 ${!message.read ? 'font-semibold text-blue-800' : ''}`}>
                      {!message.read && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                      {message.subject}
                    </h3>
                    <span className="text-sm text-gray-500">{message.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">From: {message.name} ({message.email})</p>
                  <p className="text-gray-600 line-clamp-2 mt-1">{message.message}</p>
                </div>
                <div className="flex items-center gap-2 self-end md:self-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openViewModal(message)}
                    className="gap-2"
                  >
                    <Eye size={16} />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(message.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredMessages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border">
            <Mail className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-500">No messages found</p>
          </div>
        )}
      </div>

      {/* Message View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>{viewingMessage?.subject}</DialogTitle>
              <Button
                size="sm"
                variant="ghost"
                onClick={closeViewModal}
                className="h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </div>
          </DialogHeader>

          {viewingMessage && (
            <div className="space-y-4">
              <div className="space-y-1 border-b pb-4">
                <div className="flex justify-between">
                  <p className="font-medium">From: <span className="font-normal">{viewingMessage.name}</span></p>
                  <p className="text-sm text-gray-500">{viewingMessage.date}</p>
                </div>
                <p className="font-medium">Email: <span className="font-normal">{viewingMessage.email}</span></p>
              </div>
              
              <div className="py-2">
                <p className="whitespace-pre-wrap">{viewingMessage.message}</p>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => handleDelete(viewingMessage.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    window.location.href = `mailto:${viewingMessage.email}?subject=Re: ${viewingMessage.subject}`;
                  }}
                >
                  <Mail size={16} className="mr-2" />
                  Reply
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesManager;
