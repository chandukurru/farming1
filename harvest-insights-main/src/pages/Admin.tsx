import { motion } from "framer-motion";
import { Shield, Users, MapPin, TrendingUp, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockUsers = [
  { id: "1", name: "Rajesh Kumar", email: "rajesh@farm.in", role: "admin", status: "active" },
  { id: "2", name: "Priya Sharma", email: "priya@farm.in", role: "farmer", status: "active" },
  { id: "3", name: "Amit Patel", email: "amit@farm.in", role: "farmer", status: "active" },
  { id: "4", name: "Sunita Devi", email: "sunita@farm.in", role: "viewer", status: "inactive" },
  { id: "5", name: "Vikram Singh", email: "vikram@farm.in", role: "farmer", status: "active" },
];

const overviewStats = [
  { label: "Total Users", value: "24", icon: Users },
  { label: "Active Farms", value: "18", icon: MapPin },
  { label: "Data Records", value: "12.4K", icon: Database },
  { label: "Avg Yield Growth", value: "+8.2%", icon: TrendingUp },
];

const roleColor: Record<string, string> = {
  admin: "bg-destructive/15 text-destructive",
  farmer: "bg-primary/15 text-primary",
  viewer: "bg-muted text-muted-foreground",
};

export default function Admin() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" /> Admin Panel
        </h1>
        <p className="text-muted-foreground text-sm mt-1">System overview and user management</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <div key={stat.label} className="stat-card text-center">
            <stat.icon className="h-5 w-5 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold font-display">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-5 pb-3">
          <h3 className="font-semibold font-display">User Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-left">
                <th className="p-3 font-medium text-muted-foreground">Name</th>
                <th className="p-3 font-medium text-muted-foreground">Email</th>
                <th className="p-3 font-medium text-muted-foreground">Role</th>
                <th className="p-3 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3 text-muted-foreground">{user.email}</td>
                  <td className="p-3">
                    <Badge className={roleColor[user.role]} variant="secondary">{user.role}</Badge>
                  </td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs ${user.status === "active" ? "text-success" : "text-muted-foreground"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${user.status === "active" ? "bg-success" : "bg-muted-foreground"}`} />
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
