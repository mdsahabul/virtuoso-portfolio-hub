
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Check if current route is admin dashboard to hide header/footer
  const isAdminDashboard = (pathname: string) => {
    return pathname === "/admin-dashboard";
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Conditionally render Header based on route */}
          <Routes>
            <Route path="*" element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </>
            } />
            {/* Admin dashboard without header/footer */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
