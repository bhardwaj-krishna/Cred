import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ActiveCampaigns from "./pages/ActiveCampaigns";
import NotFound from "./pages/NotFound";

import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import BrandDashboard from "@/pages/BrandDashboard";
import BrandProfile from "@/pages/brand/BrandProfile";
import AddCampaign from "@/pages/brand/AddCampaign";
import EditCampaign from "@/pages/brand/EditCampaign";
import CampaignApplications from "@/pages/brand/CampaignApplications";
import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Wrapper: Navigation + Footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/active-campaigns" element={<ActiveCampaigns />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Dashboard Wrapper */}
            <Route element={<DashboardLayout />}>
              <Route
                path="/brand/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["brand"]}>
                    <BrandDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/brand/profile"
                element={
                  <ProtectedRoute allowedRoles={["brand"]}>
                    <BrandProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/brand/add-campaign"
                element={
                  <ProtectedRoute allowedRoles={["brand"]}>
                    <AddCampaign />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/brand/campaign/:id/applications"
                element={
                  <ProtectedRoute allowedRoles={["brand"]}>
                    <CampaignApplications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/brand/edit-campaign/:id"
                element={
                  <ProtectedRoute allowedRoles={["brand"]}>
                    <EditCampaign />
                  </ProtectedRoute>
                }
              />

            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
