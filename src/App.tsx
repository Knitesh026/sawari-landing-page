import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { TranslationProvider } from "@/hooks/useTranslation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DriverRegistration from "./pages/DriverRegistration";
import DriverSuccess from "./pages/DriverSuccess";
import Waitlist from "./pages/Waitlist";
import AppDownload from "./pages/AppDownload";
import NotFound from "./pages/NotFound";
import Maintenance from "./pages/Maintenance";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Careers from "./pages/Careers";

// Admin pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDrivers from "./pages/AdminDrivers";
import AdminWaitlist from "./pages/AdminWaitlist";

const App = () => (
  <AuthProvider>
    <TranslationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Maintenance Route */}
            {/* Uncomment the line below and comment out other routes when in maintenance mode */}
            {/* <Route path="*" element={<Maintenance />} /> */}
            
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/careers" element={<Careers />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/driver-registration" element={<DriverRegistration />} />
            <Route path="/driver-success" element={<DriverSuccess />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/app-download" element={<AppDownload />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/drivers" 
              element={
                <ProtectedRoute>
                  <AdminDrivers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/waitlist" 
              element={
                <ProtectedRoute>
                  <AdminWaitlist />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TranslationProvider>
  </AuthProvider>
);

export default App;
