-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator');

-- Create user_roles table for managing admin and moderator access
CREATE TABLE public.user_roles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    role app_role NOT NULL DEFAULT 'moderator',
    assigned_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_roles
CREATE POLICY "Allow authenticated users to view user roles" 
ON public.user_roles 
FOR SELECT 
USING (true);

CREATE POLICY "Allow authenticated users to manage user roles" 
ON public.user_roles 
FOR ALL 
USING (true);

-- Create function to update timestamps
CREATE TRIGGER update_user_roles_updated_at
BEFORE UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.update_modified_column();