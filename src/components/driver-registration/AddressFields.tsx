
import { MapPin } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormFieldProps } from "./types";

interface AddressFieldsProps extends FormFieldProps {
  states: Array<{ state: string; districts: string[] }>;
  locationsLoading: boolean;
}

export const AddressFields = ({ form, t, states, locationsLoading }: AddressFieldsProps) => {
  const selectedState = form.watch("state");
  const selectedStateData = states.find(s => s.state === selectedState);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {t("address")}
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t("address")}
                {...field} 
                className="resize-none min-h-[80px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {t("state")}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={locationsLoading || states.length === 0}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("state")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white z-50 max-h-[400px]">
                {states.map((state) => (
                  <SelectItem key={state.state} value={state.state}>
                    {state.state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="district"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {t("district")}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={!selectedState || !selectedStateData || selectedStateData.districts.length === 0}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("district")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white z-50 max-h-[400px]">
                {selectedStateData?.districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="pincode"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {t("pincode")}
            </FormLabel>
            <FormControl>
              <Input placeholder={t("pincode")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
