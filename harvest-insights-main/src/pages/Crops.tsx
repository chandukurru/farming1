import { motion } from "framer-motion";
import { Plus, Search, Sprout } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockCrops = [
  { id: "1", name: "Basmati Rice", type: "Cereal", status: "growing", field_area: 5.2, planted_date: "2024-06-15", expected_harvest: "2024-11-20" },
  { id: "2", name: "Wheat", type: "Cereal", status: "planted", field_area: 8.0, planted_date: "2024-11-01", expected_harvest: "2025-04-15" },
  { id: "3", name: "Tomato", type: "Vegetable", status: "growing", field_area: 1.5, planted_date: "2024-09-10", expected_harvest: "2024-12-30" },
  { id: "4", name: "Sugarcane", type: "Cash Crop", status: "harvested", field_area: 12.0, planted_date: "2024-02-20", expected_harvest: "2024-12-15" },
  { id: "5", name: "Cotton", type: "Fiber", status: "diseased", field_area: 6.8, planted_date: "2024-05-01", expected_harvest: "2024-12-01" },
  { id: "6", name: "Maize", type: "Cereal", status: "growing", field_area: 4.5, planted_date: "2024-07-10", expected_harvest: "2024-12-20" },
];

const statusVariant: Record<string, string> = {
  growing: "bg-success/15 text-success border-success/30",
  planted: "bg-info/15 text-info border-info/30",
  harvested: "bg-secondary text-secondary-foreground border-secondary",
  diseased: "bg-destructive/15 text-destructive border-destructive/30",
};

export default function Crops() {
  const [search, setSearch] = useState("");
  const filtered = mockCrops.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Crop Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and monitor all your crops</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Crop
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search crops..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((crop, i) => (
          <motion.div
            key={crop.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="stat-card cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Sprout className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold font-display">{crop.name}</h3>
                  <p className="text-xs text-muted-foreground">{crop.type}</p>
                </div>
              </div>
              <Badge variant="outline" className={statusVariant[crop.status]}>
                {crop.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <span className="block text-foreground font-medium">{crop.field_area} ha</span>
                Field Area
              </div>
              <div>
                <span className="block text-foreground font-medium">{crop.planted_date}</span>
                Planted
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
