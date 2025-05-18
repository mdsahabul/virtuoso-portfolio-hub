
import { supabase } from './client';
import { AboutSection, HeroSection, HeaderContent, FooterContent, ContactPageContent, ReviewsSection, SEOSettings } from '../../types/appTypes';
import { toast } from 'sonner';

/**
 * Fetch a specific content section from Supabase
 * @param sectionName The name of the section to fetch
 */
export async function fetchContentSection<T>(sectionName: string): Promise<T | null> {
  try {
    const { data, error } = await supabase
      .from('content_sections')
      .select('content')
      .eq('section_name', sectionName)
      .single();

    if (error) {
      console.error('Error fetching content section:', error);
      return null;
    }

    console.log(`Successfully fetched ${sectionName} section:`, data);
    return data?.content as T;
  } catch (err) {
    console.error(`Failed to fetch ${sectionName} section:`, err);
    return null;
  }
}

/**
 * Fetch and convert about section data with proper typing
 */
export async function fetchAboutSection(): Promise<AboutSection | null> {
  try {
    const data = await fetchContentSection<AboutSection>('about');
    
    if (!data) return null;
    
    // Ensure the data conforms to AboutSection structure
    try {
      const aboutData = data as any;
      
      // Validate required properties
      if (
        typeof aboutData.title !== 'string' ||
        !Array.isArray(aboutData.description) ||
        typeof aboutData.image !== 'string' ||
        !Array.isArray(aboutData.skills)
      ) {
        console.error('Invalid about section data structure');
        return null;
      }
      
      // Convert to proper AboutSection type
      const aboutSection: AboutSection = {
        title: aboutData.title,
        description: aboutData.description as string[],
        image: aboutData.image,
        skills: aboutData.skills as string[]
      };
      
      return aboutSection;
    } catch (error) {
      console.error('Error converting about section data:', error);
      return null;
    }
  } catch (err) {
    console.error('Error in fetchAboutSection:', err);
    return null;
  }
}

/**
 * Fetch hero section with proper typing
 */
export async function fetchHeroSection(): Promise<HeroSection | null> {
  try {
    const data = await fetchContentSection<HeroSection>('hero');
    if (!data) return null;
    
    // Validate hero section data
    const heroData = data as any;
    if (
      typeof heroData.title !== 'string' ||
      typeof heroData.subtitle !== 'string' ||
      typeof heroData.backgroundImage !== 'string' ||
      typeof heroData.ctaButton !== 'string' ||
      typeof heroData.ctaLink !== 'string' ||
      typeof heroData.secondaryButton !== 'string' ||
      typeof heroData.secondaryLink !== 'string'
    ) {
      console.error('Invalid hero section data structure');
      return null;
    }
    
    return heroData as HeroSection;
  } catch (err) {
    console.error('Error in fetchHeroSection:', err);
    return null;
  }
}

/**
 * Fetch header content with proper typing
 */
export async function fetchHeaderContent(): Promise<HeaderContent | null> {
  try {
    const data = await fetchContentSection<HeaderContent>('header');
    if (!data) return null;
    
    // Validate header content data
    const headerData = data as any;
    if (
      typeof headerData.logo !== 'string' ||
      !Array.isArray(headerData.menuItems)
    ) {
      console.error('Invalid header content data structure');
      return null;
    }
    
    return headerData as HeaderContent;
  } catch (err) {
    console.error('Error in fetchHeaderContent:', err);
    return null;
  }
}

/**
 * Fetch footer content with proper typing
 */
export async function fetchFooterContent(): Promise<FooterContent | null> {
  try {
    const data = await fetchContentSection<FooterContent>('footer');
    if (!data) return null;
    
    // Validate footer content data
    const footerData = data as any;
    if (
      typeof footerData.logo !== 'string' ||
      typeof footerData.description !== 'string' ||
      typeof footerData.contactEmail !== 'string' ||
      typeof footerData.contactPhone !== 'string' ||
      typeof footerData.address !== 'string' ||
      !footerData.socialLinks ||
      !Array.isArray(footerData.menuItems) ||
      typeof footerData.copyrightText !== 'string'
    ) {
      console.error('Invalid footer content data structure');
      return null;
    }
    
    return footerData as FooterContent;
  } catch (err) {
    console.error('Error in fetchFooterContent:', err);
    return null;
  }
}

/**
 * Fetch contact page content with proper typing
 */
export async function fetchContactPageContent(): Promise<ContactPageContent | null> {
  try {
    const data = await fetchContentSection<ContactPageContent>('contact');
    if (!data) return null;
    
    // Validate contact page content data
    const contactData = data as any;
    if (
      typeof contactData.title !== 'string' ||
      typeof contactData.subtitle !== 'string' ||
      !contactData.contactInfo ||
      typeof contactData.mapLocation !== 'string'
    ) {
      console.error('Invalid contact page content data structure');
      return null;
    }
    
    return contactData as ContactPageContent;
  } catch (err) {
    console.error('Error in fetchContactPageContent:', err);
    return null;
  }
}

/**
 * Fetch reviews section with proper typing
 */
export async function fetchReviewsSection(): Promise<ReviewsSection | null> {
  try {
    const data = await fetchContentSection<ReviewsSection>('reviews');
    if (!data) return null;
    
    // Validate reviews section data
    const reviewsData = data as any;
    if (
      typeof reviewsData.title !== 'string' ||
      typeof reviewsData.subtitle !== 'string' ||
      !Array.isArray(reviewsData.reviews)
    ) {
      console.error('Invalid reviews section data structure');
      return null;
    }
    
    return reviewsData as ReviewsSection;
  } catch (err) {
    console.error('Error in fetchReviewsSection:', err);
    return null;
  }
}

/**
 * Fetch SEO settings with proper typing
 */
export async function fetchSeoSettings(): Promise<SEOSettings | null> {
  try {
    const data = await fetchContentSection<SEOSettings>('seo');
    if (!data) return null;
    
    // Validate SEO settings data
    const seoData = data as any;
    if (
      typeof seoData.siteTitle !== 'string' ||
      typeof seoData.siteDescription !== 'string' ||
      !Array.isArray(seoData.keywords) ||
      typeof seoData.ogImage !== 'string' ||
      typeof seoData.favicon !== 'string'
    ) {
      console.error('Invalid SEO settings data structure');
      return null;
    }
    
    return seoData as SEOSettings;
  } catch (err) {
    console.error('Error in fetchSeoSettings:', err);
    return null;
  }
}

/**
 * Update a content section in Supabase
 * @param sectionName The name of the section to update
 * @param content The new content for the section
 */
export async function updateContentSection(sectionName: string, content: any) {
  try {
    const { data, error } = await supabase
      .from('content_sections')
      .upsert({
        section_name: sectionName,
        content
      }, { 
        onConflict: 'section_name'
      });

    if (error) {
      console.error('Error updating content section:', error);
      toast.error(`Failed to save ${sectionName} section: ${error.message}`);
      throw error;
    }

    console.log(`Successfully updated ${sectionName} section:`, content);
    toast.success(`${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} section updated successfully`);
    return data;
  } catch (err) {
    console.error(`Failed to update ${sectionName} section:`, err);
    toast.error(`An unexpected error occurred while saving`);
    throw err;
  }
}

/**
 * Submit a contact message to the Supabase database
 * @param message The message data to submit
 */
export async function submitContactMessage(message: { name: string; email: string; subject: string; message: string }) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          name: message.name,
          email: message.email,
          subject: message.subject || 'Website Inquiry',
          message: message.message,
          read: false
        }
      ])
      .select();

    if (error) {
      console.error('Error submitting contact message:', error);
      toast.error('Failed to send message: ' + error.message);
      throw error;
    }

    console.log('Contact message submitted successfully:', data);
    toast.success('Message sent successfully!');
    return data;
  } catch (err) {
    console.error('Failed to submit contact message:', err);
    toast.error('An unexpected error occurred while sending your message');
    throw err;
  }
}
