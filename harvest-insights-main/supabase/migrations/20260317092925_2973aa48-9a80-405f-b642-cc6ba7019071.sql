
-- Tighten insert policies to require authentication explicitly
DROP POLICY IF EXISTS "Authenticated can insert sensor data" ON public.sensor_data;
CREATE POLICY "Authenticated can insert sensor data" ON public.sensor_data FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.crops WHERE crops.id = crop_id AND (crops.farmer_id = auth.uid() OR public.has_role(auth.uid(), 'admin')))
);

DROP POLICY IF EXISTS "Authenticated can manage alerts" ON public.alerts;
CREATE POLICY "Authenticated can insert alerts" ON public.alerts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update alerts" ON public.alerts FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated can insert irrigation logs" ON public.irrigation_logs;
CREATE POLICY "Farmers insert own irrigation logs" ON public.irrigation_logs FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.crops WHERE crops.id = crop_id AND (crops.farmer_id = auth.uid() OR public.has_role(auth.uid(), 'admin')))
);

DROP POLICY IF EXISTS "Authenticated can insert crop history" ON public.crop_history;
CREATE POLICY "Farmers insert own history" ON public.crop_history FOR INSERT TO authenticated WITH CHECK (
  auth.uid() = farmer_id OR public.has_role(auth.uid(), 'admin')
);
