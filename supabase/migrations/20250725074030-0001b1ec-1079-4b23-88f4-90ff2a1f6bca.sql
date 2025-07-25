-- Add logo URL fields to experiences, certifications, and skills tables
ALTER TABLE public.experiences 
ADD COLUMN company_logo_url text;

ALTER TABLE public.certifications 
ADD COLUMN organization_logo_url text;

ALTER TABLE public.skills 
ADD COLUMN icon_url text;