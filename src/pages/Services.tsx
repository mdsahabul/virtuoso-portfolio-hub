
import { Code, Layout, Smartphone, TrendingUp, Database, Globe, FileText, MessageSquare } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites built with the latest technologies to boost your online presence.',
      price: 1499,
      features: [
        'Responsive Design',
        'SEO Optimization',
        'Content Management System',
        'Contact Form Integration',
        'Google Analytics Setup'
      ],
      cta: 'Request Service'
    },
    {
      icon: Layout,
      title: 'UI/UX Design',
      description: 'User-centered design solutions to enhance user experience and engagement.',
      price: 1299,
      features: [
        'User Research',
        'Wireframing',
        'Prototyping',
        'User Testing',
        'Design System Creation'
      ],
      cta: 'Request Service',
      highlighted: true
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      price: 2499,
      features: [
        'Cross-Platform Development',
        'Native App Development',
        'App Store Submission',
        'Ongoing Maintenance',
        'Performance Optimization'
      ],
      cta: 'Request Service'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Results-driven marketing strategies to grow your audience and boost conversions.',
      price: 999,
      features: [
        'Social Media Marketing',
        'Search Engine Optimization',
        'Pay-Per-Click Advertising',
        'Content Marketing',
        'Analytics & Reporting'
      ],
      cta: 'Request Service'
    },
    {
      icon: Database,
      title: 'Database Design',
      description: 'Efficient data storage solutions to manage your business information effectively.',
      price: 1199,
      features: [
        'Schema Design',
        'Query Optimization',
        'Data Migration',
        'Performance Tuning',
        'Backup Solutions'
      ],
      cta: 'Request Service'
    },
    {
      icon: Globe,
      title: 'Web Hosting',
      description: 'Reliable hosting services to ensure your website is always available.',
      price: 299,
      features: [
        '99.9% Uptime Guarantee',
        'Daily Backups',
        'SSL Certificate',
        'Email Accounts',
        'Technical Support'
      ],
      cta: 'Request Service'
    },
    {
      icon: FileText,
      title: 'Content Creation',
      description: 'Engaging content to attract and retain your target audience.',
      price: 599,
      features: [
        'Blog Posts',
        'Product Descriptions',
        'Social Media Content',
        'Email Newsletters',
        'SEO Copywriting'
      ],
      cta: 'Request Service'
    },
    {
      icon: MessageSquare,
      title: 'Consulting',
      description: 'Expert advice to help you make informed decisions for your digital strategy.',
      price: 199,
      features: [
        'Technology Stack Selection',
        'Project Planning',
        'Team Training',
        'Process Optimization',
        'Ongoing Support (hourly rate)'
      ],
      cta: 'Request Service'
    }
  ];

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="section pt-16 pb-12 bg-blue-50">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I offer comprehensive solutions to meet your digital needs. Explore my services 
            and find the perfect fit for your project.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                price={service.price}
                features={service.features}
                cta={service.cta}
                highlighted={service.highlighted}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-blue-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Work Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              I follow a structured approach to ensure your project is delivered successfully.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                number: '01', 
                title: 'Discovery', 
                description: 'Understanding your needs and project requirements.'
              },
              { 
                number: '02', 
                title: 'Planning', 
                description: 'Creating a roadmap and timeline for your project.'
              },
              { 
                number: '03', 
                title: 'Execution', 
                description: 'Developing your solution with regular updates.'
              },
              { 
                number: '04', 
                title: 'Delivery', 
                description: 'Final review, testing, and project handover.'
              }
            ].map((step, index) => (
              <div key={index} className="card">
                <span className="text-5xl font-bold text-blue-500/20">{step.number}</span>
                <h3 className="text-xl font-bold mt-4 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about my services and process.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How long does a typical project take to complete?",
                answer: "Project timelines vary depending on scope and complexity. A simple website might take 2-4 weeks, while more complex projects can take several months. During our initial consultation, I'll provide a detailed timeline for your specific project."
              },
              {
                question: "What is your payment structure?",
                answer: "I typically work with a 50% upfront deposit to begin work, with the remaining balance due upon project completion. For larger projects, I can arrange milestone-based payments. All payment terms will be clearly outlined in our project proposal."
              },
              {
                question: "Do you provide ongoing support after project completion?",
                answer: "Yes, I offer various maintenance and support packages to ensure your digital assets continue to perform optimally. These can be tailored to your specific needs and budget."
              },
              {
                question: "Can you work with my existing team or systems?",
                answer: "Absolutely. I have experience collaborating with in-house teams and integrating with existing systems. My flexible approach allows me to adapt to your current setup while adding value through my expertise."
              },
              {
                question: "How do we get started?",
                answer: "The process begins with a consultation to discuss your needs and project requirements. Feel free to contact me through the contact form, and we can schedule a time to talk about your project in detail."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="mb-6 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
              >
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-blue-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact me today to discuss your project requirements and get a personalized quote.
          </p>
          <a href="/contact" className="btn-primary bg-white text-blue-800 hover:bg-blue-50">
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
};

export default Services;
