
import { useState } from 'react';
import { Mail, Phone, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Message sent successfully!");
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {/* Contact Information */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold">Contact Information</h3>
        <p className="text-gray-600">
          Fill out the form and I will get back to you within 24 hours.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <Mail size={24} />
            </div>
            <div>
              <h4 className="font-medium text-lg">Email</h4>
              <a href="mailto:contact@example.com" className="text-blue-600 hover:underline">
                contact@example.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <Phone size={24} />
            </div>
            <div>
              <h4 className="font-medium text-lg">Phone</h4>
              <a href="tel:+11234567890" className="text-blue-600 hover:underline">
                +1 (123) 456-7890
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-800 rounded-xl p-6 text-white">
          <h4 className="text-xl font-medium mb-4">Ready to get started?</h4>
          <p className="text-blue-100 mb-6">
            Contact me today and let's discuss how I can help you achieve your goals.
          </p>
          <a href="#consultationForm" className="bg-white text-blue-800 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors inline-block">
            Schedule a Consultation
          </a>
        </div>
      </div>
      
      {/* Contact Form */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
        {isSubmitted ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-8">
            <div className="text-green-500 mb-4">
              <CheckCircle size={64} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for reaching out. I'll get back to you shortly!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} id="consultationForm">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Project Quote">Project Quote</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-md font-medium text-white 
                    ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} 
                    transition-colors flex justify-center items-center gap-2`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
