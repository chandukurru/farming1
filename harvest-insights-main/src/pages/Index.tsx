import { motion } from "framer-motion";
import { Droplets, Thermometer, Wind, HeartPulse, TrendingUp, AlertTriangle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const sensorData = [
  { time: "06:00", moisture: 65, temperature: 22, humidity: 78 },
  { time: "08:00", moisture: 62, temperature: 25, humidity: 72 },
  { time: "10:00", moisture: 58, temperature: 29, humidity: 65 },
  { time: "12:00", moisture: 52, temperature: 33, humidity: 58 },
  { time: "14:00", moisture: 48, temperature: 35, humidity: 52 },
  { time: "16:00", moisture: 55, temperature: 31, humidity: 60 },
  { time: "18:00", moisture: 60, temperature: 27, humidity: 68 },
  { time: "20:00", moisture: 64, temperature: 24, humidity: 74 },
];

const yieldData = [
  { year: "2015", wheat: 3200, rice: 4100, corn: 2800 },
  { year: "2016", wheat: 3400, rice: 3900, corn: 3100 },
  { year: "2017", wheat: 3100, rice: 4300, corn: 2900 },
  { year: "2018", wheat: 3600, rice: 4500, corn: 3300 },
  { year: "2019", wheat: 3800, rice: 4200, corn: 3500 },
  { year: "2020", wheat: 3500, rice: 4600, corn: 3200 },
  { year: "2021", wheat: 3900, rice: 4800, corn: 3600 },
  { year: "2022", wheat: 4100, rice: 4400, corn: 3800 },
  { year: "2023", wheat: 4200, rice: 5000, corn: 3900 },
  { year: "2024", wheat: 4400, rice: 5200, corn: 4100 },
];

const stats = [
  { label: "Soil Moisture", value: "62%", icon: Droplets, color: "text-info", bg: "bg-info/10", trend: "+2.3%" },
  { label: "Temperature", value: "28°C", icon: Thermometer, color: "text-warning", bg: "bg-warning/10", trend: "-1.5°C" },
  { label: "Humidity", value: "68%", icon: Wind, color: "text-accent", bg: "bg-accent/10", trend: "+4.1%" },
  { label: "Crop Health", value: "94%", icon: HeartPulse, color: "text-success", bg: "bg-success/10", trend: "+1.2%" },
];

const alerts = [
  { message: "Low moisture detected in Field B3", severity: "high", time: "10 min ago" },
  { message: "Temperature spike in Greenhouse A", severity: "medium", time: "25 min ago" },
  { message: "Irrigation cycle completed for Field A1", severity: "low", time: "1 hr ago" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const severityColors: Record<string, string> = {
  high: "border-l-destructive bg-destructive/5",
  medium: "border-l-warning bg-warning/5",
  low: "border-l-success bg-success/5",
};

export default function Dashboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl md:text-3xl font-bold font-display">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Real-time monitoring of your farm operations
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="stat-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold font-display mt-1">{stat.value}</p>
              </div>
              <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-success font-medium">{stat.trend}</span>
              <span className="text-muted-foreground">vs last reading</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="glass-card p-5">
          <h3 className="font-semibold font-display mb-4">Sensor Readings (Today)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={sensorData}>
              <defs>
                <linearGradient id="moisture" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(200, 80%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(200, 80%, 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(80, 15%, 88%)" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="hsl(150, 10%, 45%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(150, 10%, 45%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(80, 25%, 96%)",
                  border: "1px solid hsl(80, 20%, 88%)",
                  borderRadius: "8px",
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="moisture" stroke="hsl(200, 80%, 50%)" fill="url(#moisture)" strokeWidth={2} />
              <Area type="monotone" dataKey="temperature" stroke="hsl(38, 92%, 50%)" fill="url(#temp)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-5">
          <h3 className="font-semibold font-display mb-4">10-Year Yield Trends (kg/ha)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={yieldData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(80, 15%, 88%)" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(150, 10%, 45%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(150, 10%, 45%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(80, 25%, 96%)",
                  border: "1px solid hsl(80, 20%, 88%)",
                  borderRadius: "8px",
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="wheat" fill="hsl(142, 50%, 28%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="rice" fill="hsl(36, 60%, 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="corn" fill="hsl(200, 70%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Alerts */}
      <motion.div variants={itemVariants} className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h3 className="font-semibold font-display">Recent Alerts</h3>
        </div>
        <div className="space-y-2">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className={`border-l-4 rounded-md p-3 flex items-center justify-between ${severityColors[alert.severity]}`}
            >
              <span className="text-sm">{alert.message}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{alert.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
