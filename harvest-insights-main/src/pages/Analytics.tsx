import { motion } from "framer-motion";
import { BarChart3, Filter } from "lucide-react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
  LineChart,
  Line,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const yieldByYear = Array.from({ length: 10 }, (_, i) => {
  const year = 2015 + i;
  return {
    year: year.toString(),
    Wheat: 2800 + Math.random() * 1800,
    Rice: 3500 + Math.random() * 2000,
    Maize: 2200 + Math.random() * 1500,
    Cotton: 1500 + Math.random() * 1200,
  };
});

const rainfallVsYield = Array.from({ length: 30 }, () => ({
  rainfall: 400 + Math.random() * 800,
  yield: 2000 + Math.random() * 3000,
  size: 40 + Math.random() * 60,
}));

const seasonComparison = [
  { season: "Kharif", avgYield: 4200, avgRainfall: 850 },
  { season: "Rabi", avgYield: 3600, avgRainfall: 250 },
  { season: "Summer", avgYield: 2800, avgRainfall: 150 },
];

export default function Analytics() {
  const [crop, setCrop] = useState("all");
  const [yearRange, setYearRange] = useState("10");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display flex items-center gap-2">
          <BarChart3 className="h-7 w-7 text-primary" /> Historical Analytics
        </h1>
        <p className="text-muted-foreground text-sm mt-1">10 years of crop performance data</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select value={crop} onValueChange={setCrop}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Crop" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Crops</SelectItem>
            <SelectItem value="wheat">Wheat</SelectItem>
            <SelectItem value="rice">Rice</SelectItem>
            <SelectItem value="maize">Maize</SelectItem>
            <SelectItem value="cotton">Cotton</SelectItem>
          </SelectContent>
        </Select>
        <Select value={yearRange} onValueChange={setYearRange}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Years" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="5">Last 5 Years</SelectItem>
            <SelectItem value="10">Last 10 Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold font-display mb-4">Year-wise Yield Trends (kg/ha)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yieldByYear.slice(-Number(yearRange))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(80, 15%, 88%)" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(80, 25%, 96%)", border: "1px solid hsl(80, 20%, 88%)", borderRadius: "8px", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="Wheat" fill="hsl(142, 50%, 28%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Rice" fill="hsl(36, 60%, 55%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Maize" fill="hsl(200, 70%, 50%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Cotton" fill="hsl(280, 60%, 55%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold font-display mb-4">Rainfall vs Yield</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(80, 15%, 88%)" />
              <XAxis dataKey="rainfall" name="Rainfall (mm)" tick={{ fontSize: 11 }} />
              <YAxis dataKey="yield" name="Yield (kg/ha)" tick={{ fontSize: 11 }} />
              <ZAxis dataKey="size" range={[30, 100]} />
              <Tooltip contentStyle={{ background: "hsl(80, 25%, 96%)", border: "1px solid hsl(80, 20%, 88%)", borderRadius: "8px", fontSize: 12 }} />
              <Scatter data={rainfallVsYield} fill="hsl(142, 50%, 28%)" fillOpacity={0.6} />
            </ScatterChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5 lg:col-span-2"
        >
          <h3 className="font-semibold font-display mb-4">Season-wise Comparison</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={seasonComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(80, 15%, 88%)" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="season" type="category" tick={{ fontSize: 12 }} width={70} />
              <Tooltip contentStyle={{ background: "hsl(80, 25%, 96%)", border: "1px solid hsl(80, 20%, 88%)", borderRadius: "8px", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="avgYield" name="Avg Yield (kg/ha)" fill="hsl(142, 50%, 28%)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="avgRainfall" name="Avg Rainfall (mm)" fill="hsl(200, 70%, 50%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
}
