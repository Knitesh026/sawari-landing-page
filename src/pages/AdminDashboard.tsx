
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    driversCount: 0,
    waitlistCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        
        // Fetch drivers count - make sure we're using the right table name
        const { count: driversCount, error: driversError } = await supabase
          .from('driver_registrations')
          .select('*', { count: 'exact', head: true });
        
        if (driversError) {
          console.error("Error fetching driver count:", driversError);
          throw driversError;
        }
        
        // Fetch waitlist count - make sure we're using the right table name
        const { count: waitlistCount, error: waitlistError } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true });
        
        if (waitlistError) {
          console.error("Error fetching waitlist count:", waitlistError);
          throw waitlistError;
        }
        
        setStats({
          driversCount: driversCount || 0,
          waitlistCount: waitlistCount || 0,
        });
        
        console.log("Dashboard stats fetched:", { driversCount, waitlistCount });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-700">Driver Registrations</h3>
            <p className="text-3xl font-bold mt-2">
              {isLoading ? "Loading..." : stats.driversCount}
            </p>
            <button 
              className="mt-4 text-blue-600 hover:text-blue-800 text-sm flex items-center"
              onClick={() => navigate('/admin/drivers')}
            >
              View all drivers
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-700">Waitlist Entries</h3>
            <p className="text-3xl font-bold mt-2">
              {isLoading ? "Loading..." : stats.waitlistCount}
            </p>
            <button 
              className="mt-4 text-blue-600 hover:text-blue-800 text-sm flex items-center"
              onClick={() => navigate('/admin/waitlist')}
            >
              View all waitlist
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-700">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/admin/drivers" className="text-blue-600 hover:text-blue-800">
                  Manage Drivers
                </a>
              </li>
              <li>
                <a href="/admin/waitlist" className="text-blue-600 hover:text-blue-800">
                  Manage Waitlist
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
