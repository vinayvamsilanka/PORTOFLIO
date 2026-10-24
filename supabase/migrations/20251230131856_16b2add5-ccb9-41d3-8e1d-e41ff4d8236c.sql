-- Add a restrictive SELECT policy that prevents public access
-- Only service role (admin via dashboard) can read submissions
CREATE POLICY "No public read access to contact submissions"
ON public.contact_submissions
FOR SELECT
USING (false);

-- This ensures:
-- 1. Visitors can still INSERT (existing policy allows this)
-- 2. No one can SELECT via the public API
-- 3. Admin can still view data through the database dashboard with service role