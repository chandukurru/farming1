import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Index"));
const Crops = lazy(() => import("./pages/Crops"));
const Sensors = lazy(() => import("./pages/Sensors"));
const Alerts = lazy(() => import("./pages/Alerts"));
const Irrigation = lazy(() => import("./pages/Irrigation"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Recommendations = lazy(() => import("./pages/Recommendations"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex items-center justify-center h-64">
    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/crops" element={<Crops />} />
              <Route path="/sensors" element={<Sensors />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/irrigation" element={<Irrigation />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
