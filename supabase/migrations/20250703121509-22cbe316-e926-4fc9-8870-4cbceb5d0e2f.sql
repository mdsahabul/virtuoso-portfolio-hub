
-- Enable RLS on all tables if not already enabled
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policies for projects table
CREATE POLICY "Allow anonymous users to insert projects" ON public.projects
FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous users to select projects" ON public.projects
FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous users to update projects" ON public.projects
FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow anonymous users to delete projects" ON public.projects
FOR DELETE TO anon USING (true);

-- Create policies for services table
CREATE POLICY "Allow anonymous users to insert services" ON public.services
FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous users to select services" ON public.services
FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous users to update services" ON public.services
FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow anonymous users to delete services" ON public.services
FOR DELETE TO anon USING (true);

-- Update messages table policies to allow anonymous read/write for admin functions
CREATE POLICY "Allow anonymous users to select messages" ON public.messages
FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous users to update messages" ON public.messages
FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow anonymous users to delete messages" ON public.messages
FOR DELETE TO anon USING (true);
