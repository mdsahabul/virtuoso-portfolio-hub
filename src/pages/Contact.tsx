
import ContactForm from '@/components/ContactForm';
import { MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <main className="pt-20">
      {/* Header */}
      <section className="section pt-16 pb-12 bg-blue-50">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Me</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind or want to learn more about my services? Get in touch 
            and let's discuss how I can help you achieve your goals.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section">
        <div className="container-custom">
          <ContactForm />
        </div>
      </section>

      {/* Location */}
      <section className="section bg-blue-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit My Office</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              If you prefer to meet in person, you can visit my office location.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              {/* Map Placeholder */}
              <div className="bg-white rounded-xl shadow-lg p-4 h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mx-auto">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Office Location</h3>
                    <p className="text-gray-500">123 Portfolio Street, Design District, 12345</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Office Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-lg shadow">
                    <h4 className="font-semibold mb-2">Weekdays</h4>
                    <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow">
                    <h4 className="font-semibold mb-2">Weekends</h4>
                    <p className="text-gray-600">By appointment only</p>
                  </div>
                </div>
                
                <div className="bg-blue-800 text-white p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-3">Appointment Required</h4>
                  <p className="text-blue-100 mb-4">
                    To ensure I can provide you with my full attention, please schedule an appointment 
                    before visiting the office.
                  </p>
                  <a href="mailto:contact@example.com" className="bg-white text-blue-800 px-4 py-2 rounded font-medium hover:bg-blue-50 transition-colors inline-block">
                    Schedule Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about working with me.
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: 'How quickly do you respond to inquiries?',
                answer: 'I typically respond to all inquiries within 24-48 hours during business days. For urgent matters, please indicate so in your message.'
              },
              {
                question: 'Do you work with international clients?',
                answer: 'Yes, I work with clients worldwide. With modern communication tools, geographic location is not a barrier to successful collaboration.'
              },
              {
                question: 'What information should I provide for a project quote?',
                answer: 'To provide an accurate quote, it helps to include your project timeline, scope, specific requirements, and budget range if available. The more details you can provide, the more precise the estimate will be.'
              },
              {
                question: 'Do you sign NDAs for project discussions?',
                answer: 'Absolutely. I understand the confidential nature of many projects and am happy to sign a Non-Disclosure Agreement before discussing sensitive details.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
