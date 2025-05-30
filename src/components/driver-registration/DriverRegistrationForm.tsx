import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useIndianLocations } from "@/hooks/useIndianLocations";
import { useTranslation } from "@/hooks/useTranslation";
import { Form } from "@/components/ui/form";
import { checkRateLimit } from "@/lib/rateLimiter";
import { formSchema } from "./schema";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { AddressFields } from "./AddressFields";
import { VehicleFields } from "./VehicleFields";
import { TermsAndSubmit } from "./TermsAndSubmit";

export const DriverRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { states, loading: locationsLoading } = useIndianLocations();
  const { t } = useTranslation();

  console.log("States loaded:", states.length, "states:", states.map(s => s.state).join(", "));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      district: "",
      state: "",
      licenseNumber: "",
      rcNumber: "",
      insuranceNumber: "",
      vehicleDetails: "",
      termsAccepted: false,
      pincode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Check rate limit using email and mobile as composite identifier
      if (!checkRateLimit(`${values.email}:${values.mobile}`, 3, 300000)) { // 3 attempts per 5 minutes
        throw new Error('Too many registration attempts. Please try again in 5 minutes.');
      }

      console.log("Submitting driver registration:", values);
      
      // Submit to Supabase
      const { error } = await supabase
        .from('driver_registrations')
        .insert({
          name: values.name,
          full_name: values.name,
          email: values.email,
          mobile: values.mobile,
          phone_number: values.mobile,
          address: values.address,
          district: values.district,
          state: values.state,
          license_number: values.licenseNumber,
          rc_number: values.rcNumber,
          insurance_number: values.insuranceNumber,
          vehicle_details: values.vehicleDetails,
          terms_accepted: values.termsAccepted,
          pincode: values.pincode,
          pin_code: values.pincode,
          village_post_ps: values.address
        });
      
      if (error) throw error;

      // Send notification first before showing success
      try {
        const notificationResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/driver-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            mobile: values.mobile,
            address: values.address,
            district: values.district,
            state: values.state,
            license_number: values.licenseNumber,
            rc_number: values.rcNumber,
            insurance_number: values.insuranceNumber,
            vehicle_details: values.vehicleDetails,
            pincode: values.pincode
          }),
        });

        if (!notificationResponse.ok) {
          console.error("Notification error:", await notificationResponse.text());
        }
      } catch (notificationError) {
        console.error("Error sending driver notification:", notificationError);
      }

      // Show success message and navigate
      toast.success(t("registrationSuccess"));
      navigate("/driver-success");
      
    } catch (error: any) {
      console.error("Error submitting driver registration:", error);
      toast.error(`Error: ${error.message || 'Failed to submit registration'}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <PersonalInfoFields form={form} t={t} />
        <AddressFields 
          form={form} 
          t={t} 
          states={states} 
          locationsLoading={locationsLoading} 
        />
        <VehicleFields form={form} t={t} />
        <TermsAndSubmit form={form} t={t} isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};
