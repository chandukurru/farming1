export interface Crop {
  id: string;
  name: string;
  type: string;
  status: 'growing' | 'harvested' | 'diseased' | 'planted';
  planted_date: string;
  expected_harvest: string;
  field_area: number;
  farmer_id: string;
  image_url?: string;
  created_at: string;
}

export interface SensorData {
  id: string;
  crop_id: string;
  soil_moisture: number;
  temperature: number;
  humidity: number;
  ph_level: number;
  light_intensity: number;
  recorded_at: string;
}

export interface Alert {
  id: string;
  crop_id: string;
  type: 'low_moisture' | 'high_temperature' | 'pest_detected' | 'nutrient_deficiency' | 'frost_warning';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  is_resolved: boolean;
  created_at: string;
}

export interface IrrigationLog {
  id: string;
  crop_id: string;
  method: string;
  duration_minutes: number;
  water_used_liters: number;
  notes: string;
  created_at: string;
}

export interface CropHistory {
  id: string;
  farmer_id: string;
  crop_name: string;
  season: 'Kharif' | 'Rabi' | 'Summer';
  year: number;
  soil_type: string;
  yield_amount: number;
  rainfall: number;
  temperature_avg: number;
  fertilizer_used: string;
  irrigation_method: string;
  pest_issues: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'farmer' | 'viewer';
  avatar_url?: string;
  created_at: string;
}
