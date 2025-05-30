import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type DriverRegistration = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  district: string;
  state: string;
  license_number: string;
  rc_number: string;
  insurance_number: string;
  vehicle_details: string;
  created_at: string;
};

const AdminDrivers = () => {
  const [drivers, setDrivers] = useState<DriverRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editDriver, setEditDriver] = useState<DriverRegistration | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    district: "",
    state: "",
    license_number: "",
    rc_number: "",
    insurance_number: "",
    vehicle_details: "",
    terms_accepted: false,
  });

  const fetchDrivers = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching driver registrations...");
      
      const { data, error } = await supabase
        .from("driver_registrations")
        .select("*")
        .order("created_at", { ascending: false });
      
      console.log("Drivers fetch response:", { data, error });
      
      if (error) {
        throw error;
      }
      
      setDrivers(data || []);
    } catch (error: any) {
      console.error("Error fetching drivers:", error);
      toast.error(`Error fetching drivers: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleEditClick = (driver: DriverRegistration) => {
    setEditDriver(driver);
    setFormData({
      name: driver.name,
      email: driver.email,
      mobile: driver.mobile,
      address: driver.address,
      district: driver.district,
      state: driver.state,
      license_number: driver.license_number,
      rc_number: driver.rc_number,
      insurance_number: driver.insurance_number,
      vehicle_details: driver.vehicle_details,
      terms_accepted: true,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (driverId: string) => {
    setDriverToDelete(driverId);
    setIsConfirmDeleteDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editDriver) return;
    
    try {
      const { error } = await supabase
        .from("driver_registrations")
        .update({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          address: formData.address,
          district: formData.district,
          state: formData.state,
          license_number: formData.license_number,
          rc_number: formData.rc_number,
          insurance_number: formData.insurance_number,
          vehicle_details: formData.vehicle_details,
        })
        .eq("id", editDriver.id);
      
      if (error) {
        throw error;
      }
      
      toast.success("Driver information updated successfully");
      setIsEditDialogOpen(false);
      fetchDrivers();
    } catch (error: any) {
      toast.error(`Error updating driver: ${error.message}`);
    }
  };

  const handleConfirmDelete = async () => {
    if (!driverToDelete) return;
    
    try {
      const { error } = await supabase
        .from("driver_registrations")
        .delete()
        .eq("id", driverToDelete);
      
      if (error) {
        throw error;
      }
      
      toast.success("Driver deleted successfully");
      setIsConfirmDeleteDialogOpen(false);
      setDriverToDelete(null);
      fetchDrivers();
    } catch (error: any) {
      toast.error(`Error deleting driver: ${error.message}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredDrivers = drivers.filter((driver) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      driver.name.toLowerCase().includes(searchLower) ||
      driver.email.toLowerCase().includes(searchLower) ||
      driver.mobile.toLowerCase().includes(searchLower) ||
      driver.district.toLowerCase().includes(searchLower) ||
      driver.state.toLowerCase().includes(searchLower)
    );
  });

  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Driver Registrations</h1>
          <div className="w-full md:w-64">
            <Input
              type="search"
              placeholder="Search drivers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                      <p className="mt-2 text-gray-500">Loading driver data...</p>
                    </TableCell>
                  </TableRow>
                ) : filteredDrivers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      {searchQuery ? "No drivers match your search" : "No driver registrations found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDrivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">{driver.name}</TableCell>
                      <TableCell>{driver.email}</TableCell>
                      <TableCell>{driver.mobile}</TableCell>
                      <TableCell>
                        {driver.district}, {driver.state}
                      </TableCell>
                      <TableCell>
                        {new Date(driver.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditClick(driver)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteClick(driver.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Edit Driver Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Driver Information</DialogTitle>
            <DialogDescription>
              Make changes to the driver's information below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="mobile" className="text-sm font-medium">Mobile Number</label>
              <Input
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="license_number" className="text-sm font-medium">License Number</label>
              <Input
                id="license_number"
                name="license_number"
                value={formData.license_number}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="rc_number" className="text-sm font-medium">RC Number</label>
              <Input
                id="rc_number"
                name="rc_number"
                value={formData.rc_number}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="insurance_number" className="text-sm font-medium">Insurance Number</label>
              <Input
                id="insurance_number"
                name="insurance_number"
                value={formData.insurance_number}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="district" className="text-sm font-medium">District</label>
              <Input
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="state" className="text-sm font-medium">State</label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="address" className="text-sm font-medium">Address</label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={2}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="vehicle_details" className="text-sm font-medium">Vehicle Details</label>
              <Textarea
                id="vehicle_details"
                name="vehicle_details"
                value={formData.vehicle_details}
                onChange={handleInputChange}
                rows={2}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isConfirmDeleteDialogOpen} onOpenChange={setIsConfirmDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this driver? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete Driver
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminDrivers;
