
import { FileText } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormFieldProps } from "./types";

export const VehicleFields = ({ form, t }: FormFieldProps) => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Vehicle & Documentation Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> {t("licenseNumber")}
              </FormLabel>
              <FormControl>
                <Input placeholder={t("licenseNumber")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rcNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> {t("rcNumber")}
              </FormLabel>
              <FormControl>
                <Input placeholder={t("rcNumber")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="insuranceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> {t("insuranceNumber")}
              </FormLabel>
              <FormControl>
                <Input placeholder={t("insuranceNumber")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicleDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> {t("vehicleDetails")}
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t("vehicleDetails")}
                  {...field} 
                  className="resize-none min-h-[80px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
