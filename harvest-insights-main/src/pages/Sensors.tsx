import { motion } from "framer-motion";
import { Activity, Droplets, Thermometer, Wind, Sun, FlaskConical } from "lucide-react";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function generateReading() {
  return {
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    moisture: 50 + Math.random() * 30,
    temperature: 20 + Math.random() * 18,
    humidity: 40 + Math.random() * 40,
    ph: 5.5 + Math.random() * 2.5,
    light: 200 + Math.random() * 600,
  };
}

const sensorCards = [
  { key: "moisture", label: "Soil Moisture", unit: "%", icon: Droplets, color: "text-info", bg: "bg-info/10" },
  { key: "temperature", label: "Temperature", unit: "°C", icon: Thermometer, color: "text-warning", bg: "bg-warning/10" },
  { key: "humidity", label: "Humidity", unit: "%", icon: Wind, color: "text-accent", bg: "bg-accent/10" },
  { key: "ph", label: "pH Level", unit: "", icon: FlaskConical, color: "text-primary", bg: "bg-primary/10" },
  { key: "light", label: "Light Intensity", unit: "lux", icon: Sun, color: "text-warning", bg: "bg-warning/10" },
];

export default function Sensors() {
  const [data, setData] = useState(() => Array.from({ length: 10 }, generateReading));
  const [latest, setLatest] = useState(data[data.length - 1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const next = [...prev.slice(-19), generateReading()];
        setLatest(next[next.length - 1]);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display flex items-center gap-2">
          <Activity className="h-7 w-7 text-primary" /> Sensor Monitoring
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Real-time data refreshing every 5 seconds</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {sensorCards.map((sensor) => (
          <motion.div
            key={sensor.key}
            className="stat-card text-center"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.3 }}
          >
            <div className={`mx-auto p-3 rounded-full ${sensor.bg} w-fit mb-2`}>
              <sensor.icon className={`h-5 w-5 ${sensor.color}`} />
            </div>
            <p className="text-xs text-muted-foreground">{sensor.label}</p>
            <p className="text-xl font-bold font-display">
              {(latest as any)[sensor.key]?.toFixed(1)}{sensor.unit}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-5">
        <h3 className="font-semibold font-display mb-4">Live Sensor Feed</h3>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(80, 15%, 88%)" />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="hsl(150, 10%, 45%)" />
            <YAxis tick={{ fontSize: 10 }} stroke="hsl(150, 10%, 45%)" />
            <Tooltip
              contentStyle={{
                background: "hsl(80, 25%, 96%)",
                border: "1px solid hsl(80, 20%, 88%)",
                borderRadius: "8px",
                fontSize: 12,
              }}
            />
            <Line type="monotone" dataKey="moisture" stroke="hsl(200, 80%, 50%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="temperature" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="humidity" stroke="hsl(142, 40%, 42%)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
