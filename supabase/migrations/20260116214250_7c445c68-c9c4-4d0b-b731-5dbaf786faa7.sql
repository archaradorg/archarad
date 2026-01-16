-- Create postcards table with multilingual support
CREATE TABLE public.postcards (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title_hu TEXT NOT NULL,
    title_ro TEXT NOT NULL,
    title_en TEXT NOT NULL,
    title_de TEXT NOT NULL,
    year INTEGER,
    district TEXT,
    description_hu TEXT,
    description_ro TEXT,
    description_en TEXT,
    description_de TEXT,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.postcards ENABLE ROW LEVEL SECURITY;

-- Public can read postcards (archive is public)
CREATE POLICY "Anyone can view postcards"
ON public.postcards
FOR SELECT
USING (true);

-- Create profiles table for admin users
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create user roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
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
  )
$$;

-- Only admins can manage postcards
CREATE POLICY "Admins can insert postcards"
ON public.postcards
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update postcards"
ON public.postcards
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete postcards"
ON public.postcards
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Create storage bucket for postcard images
INSERT INTO storage.buckets (id, name, public)
VALUES ('postcards', 'postcards', true);

-- Storage policies for postcards bucket
CREATE POLICY "Anyone can view postcard images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'postcards');

CREATE POLICY "Admins can upload postcard images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'postcards' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update postcard images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'postcards' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete postcard images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'postcards' AND public.has_role(auth.uid(), 'admin'));

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for automatic timestamp updates
CREATE TRIGGER update_postcards_updated_at
BEFORE UPDATE ON public.postcards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();