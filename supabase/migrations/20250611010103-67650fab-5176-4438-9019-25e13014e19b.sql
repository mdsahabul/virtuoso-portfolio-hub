
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous message submissions" ON public.messages;
DROP POLICY IF EXISTS "Authenticated users can view messages" ON public.messages;
DROP POLICY IF EXISTS "Authenticated users can update messages" ON public.messages;
DROP POLICY IF EXISTS "Authenticated users can delete messages" ON public.messages;

-- Enable RLS on the messages table if not already enabled
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anonymous users to insert messages
-- This is needed since visitors will submit contact messages without being logged in
CREATE POLICY "Allow anonymous message submissions" 
ON public.messages 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Create a policy that allows authenticated users to view messages
-- This ensures admin users can see submitted messages
CREATE POLICY "Authenticated users can view messages" 
ON public.messages 
FOR SELECT 
TO authenticated
USING (true);

-- Create a policy that allows authenticated users to update messages (e.g., marking as read)
CREATE POLICY "Authenticated users can update messages" 
ON public.messages 
FOR UPDATE 
TO authenticated
USING (true);

-- Create a policy that allows authenticated users to delete messages
CREATE POLICY "Authenticated users can delete messages" 
ON public.messages 
FOR DELETE 
TO authenticated
USING (true);
