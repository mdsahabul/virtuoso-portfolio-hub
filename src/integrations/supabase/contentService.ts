
import { supabase } from './client';
import { AboutSection } from '../types/appTypes';

/**
 * Fetch a specific content section from Supabase
 * @param sectionName The name of the section to fetch
 */
export async function fetchContentSection(sectionName: string) {
  const { data, error } = await supabase
    .from('content_sections')
    .select('content')
    .eq('section_name', sectionName)
    .single();

  if (error) {
    console.error('Error fetching content section:', error);
    return null;
  }

  return data?.content;
}

/**
 * Fetch and convert about section data with proper typing
 */
export async function fetchAboutSection(): Promise<AboutSection | null> {
  const data = await fetchContentSection('about');
  
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
}

/**
 * Update a content section in Supabase
 * @param sectionName The name of the section to update
 * @param content The new content for the section
 */
export async function updateContentSection(sectionName: string, content: any) {
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
    throw error;
  }

  return data;
}
