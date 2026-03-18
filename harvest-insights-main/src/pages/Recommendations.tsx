import { motion } from "framer-motion";
import { Brain, TrendingUp, Leaf, CloudRain, Thermometer, Sprout } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const recommendations = [
  {
    crop: "Wheat",
    confidence: 92,
    reason: "Based on 10-year yield data, your soil type (Alluvial) and Rabi season rainfall patterns show optimal conditions for wheat. Average yield: 4,100 kg/ha.",
    factors: ["Soil Type Match: 95%", "Weather Pattern: 88%", "Historical Yield: 4,100 kg/ha avg"],
    icon: Sprout,
  },
  {
    crop: "Mustard",
    confidence: 85,
    reason: "Mustard performs well in your region during Rabi with minimal irrigation needs. 8 out of 10 years showed above-average yields.",
    factors: ["Low Water Needs", "Good Market Price", "Pest Resistant"],
    icon: Leaf,
  },
  {
    crop: "Rice (Basmati)",
    confidence: 78,
    reason: "Strong Kharif performance with flood irrigation. Consider if monsoon forecast is favorable.",
    factors: ["High Revenue Crop", "Monsoon Dependent", "5-year upward yield trend"],
    icon: CloudRain,
  },
];

const insights = [
  { label: "Best Performing Crop (10yr)", value: "Rice — 4,800 kg/ha avg", icon: TrendingUp },
  { label: "Optimal Season", value: "Kharif — 23% higher yields", icon: Thermometer },
  { label: "Recommended Fertilizer", value: "NPK 20-20-20 based on soil analysis", icon: Leaf },
];

export default function Recommendations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display flex items-center gap-2">
          <Brain className="h-7 w-7 text-accent" /> AI Recommendations
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Smart suggestions powered by 10 years of historical data
        </p>
      </div>

      {/* Key insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <div key={insight.label} className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <insight.icon className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">{insight.label}</span>
            </div>
            <p className="text-sm font-semibold font-display">{insight.value}</p>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h2 className="font-semibold font-display text-sm uppercase tracking-wide text-muted-foreground">
          Crop Recommendations for Next Season
        </h2>
        {recommendations.map((rec, i) => (
          <motion.div
            key={rec.crop}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <rec.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold font-display text-lg">{rec.crop}</h3>
                    <Badge variant="secondary" className="bg-success/15 text-success">
                      {rec.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rec.reason}</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.factors.map((f) => (
                      <Badge key={f} variant="outline" className="text-xs">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
