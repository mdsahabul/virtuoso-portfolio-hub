
import { supabase } from './client';

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
