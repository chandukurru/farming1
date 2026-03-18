import { motion } from "framer-motion";
import { Bell, CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const mockAlerts = [
  { id: "1", type: "low_moisture", severity: "critical", message: "Soil moisture critically low in Field B3 (18%)", crop: "Wheat", is_resolved: false, time: "10 min ago" },
  { id: "2", type: "high_temperature", severity: "high", message: "Temperature exceeds 40°C in Greenhouse A", crop: "Tomato", is_resolved: false, time: "25 min ago" },
  { id: "3", type: "pest_detected", severity: "medium", message: "Aphid activity detected in Cotton field", crop: "Cotton", is_resolved: false, time: "1 hr ago" },
  { id: "4", type: "frost_warning", severity: "high", message: "Frost warning: Temperature dropping below 2°C tonight", crop: "All", is_resolved: false, time: "2 hrs ago" },
  { id: "5", type: "nutrient_deficiency", severity: "low", message: "Nitrogen levels below optimal in Maize plot", crop: "Maize", is_resolved: true, time: "5 hrs ago" },
  { id: "6", type: "low_moisture", severity: "medium", message: "Soil moisture declining in Rice paddy A1", crop: "Rice", is_resolved: true, time: "8 hrs ago" },
];

const severityConfig: Record<string, { icon: typeof AlertTriangle; color: string; bg: string; badge: string }> = {
  critical: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10 border-l-destructive", badge: "bg-destructive text-destructive-foreground" },
  high: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10 border-l-warning", badge: "bg-warning text-warning-foreground" },
  medium: { icon: Info, color: "text-info", bg: "bg-info/10 border-l-info", badge: "bg-info text-info-foreground" },
  low: { icon: Info, color: "text-muted-foreground", bg: "bg-muted border-l-muted-foreground", badge: "bg-muted text-muted-foreground" },
};

export default function Alerts() {
  const [alerts, setAlerts] = useState(mockAlerts);

  const resolve = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, is_resolved: true } : a)));
  };

  const active = alerts.filter((a) => !a.is_resolved);
  const resolved = alerts.filter((a) => a.is_resolved);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display flex items-center gap-2">
            <Bell className="h-7 w-7 text-warning" /> Alerts
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{active.length} active alerts</p>
        </div>
      </div>

      {active.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-semibold font-display text-sm uppercase tracking-wide text-muted-foreground">Active</h2>
          {active.map((alert, i) => {
            const cfg = severityConfig[alert.severity];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`border-l-4 rounded-lg p-4 flex items-start justify-between gap-4 ${cfg.bg}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${cfg.color}`} />
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={cfg.badge} variant="secondary">{alert.severity}</Badge>
                      <span className="text-xs text-muted-foreground">{alert.crop} · {alert.time}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => resolve(alert.id)} className="shrink-0">
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Resolve
                </Button>
              </motion.div>
            );
          })}
        </div>
      )}

      {resolved.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-semibold font-display text-sm uppercase tracking-wide text-muted-foreground">Resolved</h2>
          {resolved.map((alert) => (
            <div key={alert.id} className="border-l-4 border-l-muted rounded-lg p-4 opacity-60">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="text-sm line-through">{alert.message}</p>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
