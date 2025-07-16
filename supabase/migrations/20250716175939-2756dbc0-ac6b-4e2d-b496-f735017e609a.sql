-- Insert default admin user
INSERT INTO public.user_roles (email, role, assigned_by)
VALUES ('devsahabul@gmail.com', 'admin', 'system')
ON CONFLICT (email) DO NOTHING;