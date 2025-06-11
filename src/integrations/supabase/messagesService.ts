
import { supabase } from './client';
import { Message, mapDbMessageToMessage } from '../../types/appTypes';
import { toast } from 'sonner';

export async function fetchMessages(): Promise<Message[]> {
  try {
    console.log("Fetching messages from Supabase...");
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }

    console.log("Messages data from Supabase:", data);
    return data.map(mapDbMessageToMessage);
  } catch (err) {
    console.error('Failed to fetch messages:', err);
    return [];
  }
}

export async function updateMessage(id: string, updates: Partial<Message>): Promise<boolean> {
  try {
    console.log("Updating message in Supabase:", id, updates);
    
    const updateData = {
      ...(updates.read !== undefined && { read: updates.read })
    };

    const { error } = await supabase
      .from('messages')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating message:', error);
      toast.error(`Failed to update message: ${error.message}`);
      return false;
    }

    console.log("Message updated successfully");
    return true;
  } catch (err) {
    console.error('Failed to update message:', err);
    toast.error('An unexpected error occurred while updating message');
    return false;
  }
}

export async function deleteMessage(id: string): Promise<boolean> {
  try {
    console.log("Deleting message from Supabase:", id);
    
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting message:', error);
      toast.error(`Failed to delete message: ${error.message}`);
      return false;
    }

    console.log("Message deleted successfully");
    toast.success('Message deleted successfully');
    return true;
  } catch (err) {
    console.error('Failed to delete message:', err);
    toast.error('An unexpected error occurred while deleting message');
    return false;
  }
}
