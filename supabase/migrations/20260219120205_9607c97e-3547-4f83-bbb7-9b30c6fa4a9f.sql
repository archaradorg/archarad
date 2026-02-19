-- Fix has_role() SECURITY DEFINER function to prevent admin enumeration
-- Restrict the function to only allow users to check their own role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND user_id = auth.uid()
  )
$$;

COMMENT ON FUNCTION public.has_role IS 'Checks if the CURRENT authenticated user has a given role. Only allows self-check (user_id must equal auth.uid()). Intended for use in RLS policies only.';