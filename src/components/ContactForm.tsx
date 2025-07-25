
import { useState } from 'react';
import { useData } from '../context/DataContext';
import { toast } from 'sonner';
import { submitContactMessage } from '../integrations/supabase/contentService';

interface ContactFormProps {
  onSuccess?: () => void;
}

const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const { addMessage } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert into Supabase using our contentService function
      const data = await submitContactMessage(formData);
      
      // Add to DataContext if the insert was successful
      if (data && data[0]) {
        addMessage(formData, data[0].id);
      } else {
        // If no data returned, just add to context
        addMessage(formData);
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      // We don't need to toast here as the submitContactMessage function already does that
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
            Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
          Message *
        </label>
        <textarea
          name="message"
          id="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
