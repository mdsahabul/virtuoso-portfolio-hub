
import { useState } from 'react';
import { Code, Layout, Smartphone, TrendingUp, Database, Globe, FileText, MessageSquare, ShoppingCart } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Form schema for service orders
const orderSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }),
  requirements: z.string().min(10, { message: "Please provide more details about your requirements" }),
});

type OrderFormValues = z.infer<typeof orderSchema>;

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Initialize form
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      requirements: "",
    },
  });

  const handleOrderRequest = (service: any) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  const onSubmit = (data: OrderFormValues) => {
    console.log("Order submitted:", { service: selectedService, ...data });
    
    // This would connect to your backend/Supabase in a complete implementation
    toast.success("Your order has been placed successfully! We'll contact you shortly.", {
      duration: 5000,
    });
    
    setIsDialogOpen(false);
    form.reset();
  };

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites built with the latest technologies to boost your online presence.",
      price: 1499,
      features: [
        "Responsive Design",
        "SEO Optimization",
        "Content Management System",
        "Contact Form Integration",
        "Google Analytics Setup"
      ],
      cta: "Order Service"
    },
    {
      icon: Layout,
      title: "UI/UX Design",
      description: "User-centered design solutions to enhance user experience and engagement.",
      price: 1299,
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "User Testing",
        "Design System Creation"
      ],
      cta: "Order Service",
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
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Services for Your Digital Needs</h1>
            <p className="text-xl text-blue-100 mb-8">
              Delivering exceptional quality and value across a range of digital services to help your business thrive online.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="default" className="bg-white text-blue-800 hover:bg-blue-50">
                Explore Services
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
                Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I offer comprehensive solutions tailored to meet your specific business needs. Browse my service offerings below.
            </p>
          </div>
          
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
                onAction={() => handleOrderRequest(service)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose My Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              What sets my services apart from others in the industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Focus",
                description: "Every project is approached with meticulous attention to detail and a commitment to excellence.",
                icon: "🏆"
              },
              {
                title: "Client Satisfaction",
                description: "Your satisfaction is my priority, with clear communication and consistent results.",
                icon: "🤝"
              },
              {
                title: "Ongoing Support",
                description: "I don't just deliver and disappear. Comprehensive support ensures your long-term success.",
                icon: "🛡️"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Work Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              I follow a structured approach to ensure your project is delivered successfully.
            </p>
          </div>
          
          <div className="relative">
            {/* Process timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-12 md:space-y-0">
              {[
                { 
                  number: "01", 
                  title: "Discovery", 
                  description: "I begin by understanding your needs, goals, and project requirements through in-depth consultation."
                },
                { 
                  number: "02", 
                  title: "Planning", 
                  description: "Creating a comprehensive roadmap and timeline for your project with clear milestones and deliverables."
                },
                { 
                  number: "03", 
                  title: "Execution", 
                  description: "Developing your solution with regular updates and opportunities for feedback throughout the process."
                },
                { 
                  number: "04", 
                  title: "Delivery", 
                  description: "Final review, testing, and project handover, ensuring everything meets your expectations."
                }
              ].map((step, index) => (
                <div key={index} className={`md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2"></div>
                  <div className="relative md:w-1/2 bg-white p-6 rounded-lg shadow-md">
                    {/* Circle on timeline */}
                    <div className="hidden md:flex absolute top-1/2 -mt-4 
                      ${index % 2 === 0 ? 'left-0 -ml-4' : 'right-0 -mr-4'} 
                      w-8 h-8 rounded-full bg-blue-500 text-white items-center justify-center text-sm font-bold">
                      {step.number}
                    </div>
                    <div className="md:hidden text-3xl font-bold text-blue-500/20 mb-2">{step.number}</div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Here's what my clients have to say about my services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The quality of work delivered exceeded our expectations. Our website traffic has increased by 150% since launch.",
                name: "Sarah Johnson",
                company: "Tech Innovations Inc."
              },
              {
                quote: "Incredibly professional and responsive. The process was smooth from start to finish, with excellent attention to detail.",
                name: "Michael Chen",
                company: "Global Solutions"
              },
              {
                quote: "The mobile app developed has transformed our business operations and received outstanding feedback from our customers.",
                name: "Emma Williams",
                company: "Retail Success"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="opacity-25">
                    <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.96.41-3.016.341-1.167.928-2.075.928-2.075.41-.282.66-.713.66-1.184 0-.468-.24-.91-.66-1.192l-.52-.357c-.134-.095-.286-.16-.44-.193a1.31 1.31 0 00-.488-.01c-.338.058-.65.252-.86.534l-.976 1.107c-.835 1.34-1.23 2.865-1.23 4.456 0 1.397.395 2.618 1.183 3.635.762.979 1.73 1.44 2.876 1.44.682 0 1.305-.214 1.846-.643.551-.436.828-.974.828-1.615zm7.334 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.96.41-3.016.341-1.167.928-2.075.928-2.075.41-.282.66-.713.66-1.184 0-.468-.24-.91-.66-1.192l-.52-.357c-.134-.095-.286-.16-.44-.193a1.31 1.31 0 00-.488-.01c-.339.058-.65.252-.86.534l-.978 1.107c-.835 1.34-1.23 2.865-1.23 4.456 0 1.397.395 2.618 1.183 3.635.762.979 1.73 1.44 2.876 1.44.682 0 1.305-.214 1.846-.643.55-.436.828-.974.828-1.615z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about my services and process.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
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
                className="py-6 first:pt-0 last:pb-0"
              >
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact me today to discuss your project requirements and get a personalized quote tailored to your needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="default" className="bg-white text-blue-800 hover:bg-blue-50">
              Get a Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Order Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Order Service: {selectedService?.title}</DialogTitle>
            <DialogDescription>
              Fill out the form below to request this service. We'll contact you to discuss details.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Requirements</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe your project needs and requirements" 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Submitting..." : "Submit Order Request"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Services;
