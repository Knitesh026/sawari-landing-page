
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile header */}
      <header className="bg-[#FD9D00] text-white p-4 flex justify-between items-center md:hidden">
        <h1 className="text-xl font-bold">SawaRI Admin</h1>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Mobile sidebar */}
      <Collapsible open={sidebarOpen} onOpenChange={setSidebarOpen} className="md:hidden">
        <CollapsibleContent className="bg-[#FD9D00]/90 text-white">
          <nav className="p-4 space-y-2">
            <Link
              to="/admin/dashboard"
              className={`block p-3 rounded ${isActive('/admin/dashboard') ? 'bg-[#FD9D00]' : 'hover:bg-[#FD9D00]'}`}
              onClick={() => setSidebarOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/drivers"
              className={`block p-3 rounded ${isActive('/admin/drivers') ? 'bg-[#FD9D00]' : 'hover:bg-[#FD9D00]'}`}
              onClick={() => setSidebarOpen(false)}
            >
              Driver Registrations
            </Link>
            <Link
              to="/admin/waitlist"
              className={`block p-3 rounded ${isActive('/admin/waitlist') ? 'bg-[#FD9D00]' : 'hover:bg-[#FD9D00]'}`}
              onClick={() => setSidebarOpen(false)}
            >
              Waitlist
            </Link>
            <Button 
              variant="destructive" 
              className="w-full mt-4"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </nav>
        </CollapsibleContent>
      </Collapsible>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 bg-[#FD9D00] text-white flex-shrink-0 flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold">SawaRI Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className={`block p-3 rounded ${isActive('/admin/dashboard') ? 'bg-[#FD9D00]/80' : 'hover:bg-[#FD9D00]/80'}`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/drivers"
            className={`block p-3 rounded ${isActive('/admin/drivers') ? 'bg-[#FD9D00]/80' : 'hover:bg-[#FD9D00]/80'}`}
          >
            Driver Registrations
          </Link>
          <Link
            to="/admin/waitlist"
            className={`block p-3 rounded ${isActive('/admin/waitlist') ? 'bg-[#FD9D00]/80' : 'hover:bg-[#FD9D00]/80'}`}
          >
            Waitlist
          </Link>
        </nav>
        <div className="p-4">
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
