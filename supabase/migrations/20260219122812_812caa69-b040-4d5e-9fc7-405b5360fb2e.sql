-- Grant admin role to rudi@stefanik.hu
-- Looks up the user's UUID from auth.users and inserts into user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'rudi@stefanik.hu'
ON CONFLICT (user_id, role) DO NOTHING;
