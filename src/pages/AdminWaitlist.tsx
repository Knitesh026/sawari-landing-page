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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

type WaitlistEntry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  usage_frequency: string;
  marketing_consent: boolean;
  created_at: string;
};

const AdminWaitlist = () => {
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editEntry, setEditEntry] = useState<WaitlistEntry | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    usage_frequency: "",
    marketing_consent: false,
  });

  const fetchWaitlist = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching waitlist entries...");
      
      const { data, error } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });
      
      console.log("Waitlist fetch response:", { data, error });
      
      if (error) {
        throw error;
      }
      
      setWaitlistEntries(data || []);
    } catch (error: any) {
      console.error("Error fetching waitlist:", error);
      toast.error(`Error fetching waitlist: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const handleEditClick = (entry: WaitlistEntry) => {
    setEditEntry(entry);
    setFormData({
      name: entry.name,
      email: entry.email,
      phone: entry.phone,
      location: entry.location,
      usage_frequency: entry.usage_frequency,
      marketing_consent: entry.marketing_consent,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (entryId: string) => {
    setEntryToDelete(entryId);
    setIsConfirmDeleteDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editEntry) return;
    
    try {
      const { error } = await supabase
        .from("waitlist")
        .update({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          usage_frequency: formData.usage_frequency,
          marketing_consent: formData.marketing_consent,
        })
        .eq("id", editEntry.id);
      
      if (error) {
        throw error;
      }
      
      toast.success("Waitlist entry updated successfully");
      setIsEditDialogOpen(false);
      fetchWaitlist();
    } catch (error: any) {
      toast.error(`Error updating waitlist entry: ${error.message}`);
    }
  };

  const handleConfirmDelete = async () => {
    if (!entryToDelete) return;
    
    try {
      const { error } = await supabase
        .from("waitlist")
        .delete()
        .eq("id", entryToDelete);
      
      if (error) {
        throw error;
      }
      
      toast.success("Waitlist entry deleted successfully");
      setIsConfirmDeleteDialogOpen(false);
      setEntryToDelete(null);
      fetchWaitlist();
    } catch (error: any) {
      toast.error(`Error deleting waitlist entry: ${error.message}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, marketing_consent: checked }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, usage_frequency: value }));
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case "daily": return "Daily (commuting)";
      case "weekly": return "Few times a week";
      case "monthly": return "Few times a month";
      case "rarely": return "Occasionally";
      default: return frequency;
    }
  };

  const filteredEntries = waitlistEntries.filter((entry) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      entry.name.toLowerCase().includes(searchLower) ||
      entry.email.toLowerCase().includes(searchLower) ||
      entry.phone.toLowerCase().includes(searchLower) ||
      entry.location.toLowerCase().includes(searchLower)
    );
  });

  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Waitlist Entries</h1>
          <div className="w-full md:w-64">
            <Input
              type="search"
              placeholder="Search waitlist..."
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
                  <TableHead>Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Usage Frequency</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                      <p className="mt-2 text-gray-500">Loading waitlist data...</p>
                    </TableCell>
                  </TableRow>
                ) : filteredEntries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      {searchQuery ? "No entries match your search" : "No waitlist entries found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.name}</TableCell>
                      <TableCell>{entry.email}</TableCell>
                      <TableCell>{entry.phone}</TableCell>
                      <TableCell>{entry.location}</TableCell>
                      <TableCell>{getFrequencyLabel(entry.usage_frequency)}</TableCell>
                      <TableCell>
                        {new Date(entry.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditClick(entry)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteClick(entry.id)}
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

      {/* Edit Entry Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Waitlist Entry</DialogTitle>
            <DialogDescription>
              Make changes to the waitlist entry below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
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
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">Location</label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">Usage Frequency</label>
              <RadioGroup 
                value={formData.usage_frequency} 
                onValueChange={handleRadioChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <label htmlFor="daily">Daily (commuting)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <label htmlFor="weekly">Few times a week</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <label htmlFor="monthly">Few times a month</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="rarely" />
                  <label htmlFor="rarely">Occasionally</label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="marketing_consent"
                checked={formData.marketing_consent}
                onCheckedChange={handleCheckboxChange}
              />
              <label 
                htmlFor="marketing_consent" 
                className="text-sm text-gray-700"
              >
                Marketing consent provided
              </label>
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
              Are you sure you want to delete this waitlist entry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminWaitlist;
