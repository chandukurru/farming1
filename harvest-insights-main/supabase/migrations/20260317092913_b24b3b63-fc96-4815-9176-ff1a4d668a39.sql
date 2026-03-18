
-- Users profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'farmer', 'viewer');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'farmer',
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Crops
CREATE TABLE public.crops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'planted' CHECK (status IN ('growing', 'harvested', 'diseased', 'planted')),
  planted_date DATE NOT NULL,
  expected_harvest DATE,
  field_area NUMERIC(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all crops" ON public.crops FOR SELECT TO authenticated USING (true);
CREATE POLICY "Farmers manage own crops" ON public.crops FOR ALL TO authenticated USING (auth.uid() = farmer_id) WITH CHECK (auth.uid() = farmer_id);
CREATE POLICY "Admins manage all crops" ON public.crops FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_crops_farmer ON public.crops(farmer_id);
CREATE INDEX idx_crops_status ON public.crops(status);

-- Sensor Data
CREATE TABLE public.sensor_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE NOT NULL,
  soil_moisture NUMERIC(5,2),
  temperature NUMERIC(5,2),
  humidity NUMERIC(5,2),
  ph_level NUMERIC(4,2),
  light_intensity NUMERIC(8,2),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.sensor_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can view sensor data" ON public.sensor_data FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert sensor data" ON public.sensor_data FOR INSERT TO authenticated WITH CHECK (true);

CREATE INDEX idx_sensor_recorded ON public.sensor_data(recorded_at DESC);
CREATE INDEX idx_sensor_crop ON public.sensor_data(crop_id);

-- Alerts
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('low_moisture', 'high_temperature', 'pest_detected', 'nutrient_deficiency', 'frost_warning')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  message TEXT NOT NULL,
  is_resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can view alerts" ON public.alerts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage alerts" ON public.alerts FOR ALL TO authenticated USING (true);

CREATE INDEX idx_alerts_resolved ON public.alerts(is_resolved);

-- Irrigation Logs
CREATE TABLE public.irrigation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE NOT NULL,
  method TEXT NOT NULL,
  duration_minutes INT NOT NULL,
  water_used_liters NUMERIC(10,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.irrigation_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can view irrigation logs" ON public.irrigation_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert irrigation logs" ON public.irrigation_logs FOR INSERT TO authenticated WITH CHECK (true);

-- Crop History (10-year data)
CREATE TABLE public.crop_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  season TEXT NOT NULL CHECK (season IN ('Kharif', 'Rabi', 'Summer')),
  year INT NOT NULL CHECK (year >= 2000 AND year <= 2100),
  soil_type TEXT NOT NULL,
  yield_amount NUMERIC(10,2) NOT NULL,
  rainfall NUMERIC(8,2),
  temperature_avg NUMERIC(5,2),
  fertilizer_used TEXT,
  irrigation_method TEXT,
  pest_issues TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.crop_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can view crop history" ON public.crop_history FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert crop history" ON public.crop_history FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins manage all history" ON public.crop_history FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_history_year ON public.crop_history(year);
CREATE INDEX idx_history_crop ON public.crop_history(crop_name);
CREATE INDEX idx_history_farmer ON public.crop_history(farmer_id);
CREATE INDEX idx_history_season ON public.crop_history(season);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_crops_updated_at BEFORE UPDATE ON public.crops FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
