import { motion } from "framer-motion";
import { Droplets, Plus, Clock, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockLogs = [
  { id: "1", crop: "Rice Paddy A1", method: "Flood Irrigation", duration: 120, water: 5000, date: "2024-12-10", notes: "Scheduled cycle" },
  { id: "2", crop: "Wheat Field B2", method: "Drip Irrigation", duration: 45, water: 800, date: "2024-12-10", notes: "Low moisture response" },
  { id: "3", crop: "Tomato Plot C", method: "Sprinkler", duration: 30, water: 400, date: "2024-12-09", notes: "Evening cycle" },
  { id: "4", crop: "Sugarcane D1", method: "Furrow", duration: 90, water: 3500, date: "2024-12-09", notes: "Bi-weekly schedule" },
  { id: "5", crop: "Maize E2", method: "Drip Irrigation", duration: 60, water: 1200, date: "2024-12-08", notes: "Nutrient delivery included" },
];

const suggestions = [
  { crop: "Wheat Field B2", suggestion: "Increase irrigation frequency — moisture trending 15% below optimal based on 10-year Rabi averages.", priority: "high" },
  { crop: "Cotton Field F1", suggestion: "Reduce water by 20% — current humidity is above average. Historical data shows over-irrigation risk.", priority: "medium" },
  { crop: "Rice Paddy A1", suggestion: "Maintain current schedule — conditions match successful 2021-2023 Kharif patterns.", priority: "low" },
];

const priorityColor: Record<string, string> = {
  high: "bg-destructive/15 text-destructive",
  medium: "bg-warning/15 text-warning",
  low: "bg-success/15 text-success",
};

export default function Irrigation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display flex items-center gap-2">
            <Droplets className="h-7 w-7 text-info" /> Irrigation
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Logs and smart suggestions</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Log Irrigation
        </Button>
      </div>

      {/* Smart suggestions */}
      <div className="glass-card p-5">
        <h3 className="font-semibold font-display mb-3 flex items-center gap-2">
          <Beaker className="h-5 w-5 text-primary" /> Smart Suggestions
        </h3>
        <div className="space-y-3">
          {suggestions.map((s, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Badge className={priorityColor[s.priority]} variant="secondary">{s.priority}</Badge>
              <div>
                <p className="text-sm font-medium">{s.crop}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logs */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 pb-3">
          <h3 className="font-semibold font-display">Irrigation Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-left">
                <th className="p-3 font-medium text-muted-foreground">Crop</th>
                <th className="p-3 font-medium text-muted-foreground">Method</th>
                <th className="p-3 font-medium text-muted-foreground">Duration</th>
                <th className="p-3 font-medium text-muted-foreground">Water (L)</th>
                <th className="p-3 font-medium text-muted-foreground">Date</th>
                <th className="p-3 font-medium text-muted-foreground">Notes</th>
              </tr>
            </thead>
            <tbody>
              {mockLogs.map((log) => (
                <tr key={log.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-medium">{log.crop}</td>
                  <td className="p-3">{log.method}</td>
                  <td className="p-3 flex items-center gap-1"><Clock className="h-3 w-3" />{log.duration} min</td>
                  <td className="p-3">{log.water.toLocaleString()}</td>
                  <td className="p-3">{log.date}</td>
                  <td className="p-3 text-muted-foreground">{log.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
