
import { supabase } from './client';
import { Message, mapDbMessageToMessage } from '../../types/appTypes';
import { toast } from 'sonner';

export async function fetchMessages(): Promise<Message[]> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }

    return data.map(mapDbMessageToMessage);
  } catch (err) {
    console.error('Failed to fetch messages:', err);
    return [];
  }
}

export async function updateMessage(id: string, updates: Partial<Message>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('messages')
      .update({
        read: updates.read
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating message:', error);
      toast.error('Failed to update message');
      return false;
    }

    return true;
  } catch (err) {
    console.error('Failed to update message:', err);
    toast.error('An unexpected error occurred');
    return false;
  }
}

export async function deleteMessage(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
      return false;
    }

    toast.success('Message deleted successfully');
    return true;
  } catch (err) {
    console.error('Failed to delete message:', err);
    toast.error('An unexpected error occurred');
    return false;
  }
}
