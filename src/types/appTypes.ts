
// Custom application types that work with our Supabase schema
import { Database } from '@/integrations/supabase/types';

// Message types
export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  createdAt: string; // Added to match the usage in MessagesManager
  read: boolean;
}

// Map from Supabase types to our application types
export function mapDbMessageToMessage(dbMessage: Database['public']['Tables']['messages']['Row']): Message {
  return {
    id: dbMessage.id,
    name: dbMessage.name,
    email: dbMessage.email,
    subject: dbMessage.subject,
    message: dbMessage.message,
    date: dbMessage.created_at || new Date().toISOString().split('T')[0],
    createdAt: dbMessage.created_at || new Date().toISOString(), // Added to match the usage in MessagesManager
    read: dbMessage.read || false
  };
}

// Type for new message submission
export type NewMessage = Omit<Message, 'id' | 'date' | 'createdAt' | 'read'>;
