
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminNavButton = () => {
  return (
    <Button asChild variant="outline" className="ml-4 border-[#FD9D00] text-[#FD9D00] hover:bg-[#FD9D00]/10" size="sm">
      <Link to="/admin/login">
        Admin Panel
      </Link>
    </Button>
  );
};

export default AdminNavButton;
