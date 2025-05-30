import { Loader2 } from "lucide-react";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FormFieldProps } from "./types";

interface TermsAndSubmitProps extends FormFieldProps {
  isSubmitting: boolean;
}

export const TermsAndSubmit = ({ form, t, isSubmitting }: TermsAndSubmitProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="termsAccepted"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-[#FD9D00]/5">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isSubmitting}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                {t("termsAccepted")}
              </FormLabel>
              <FormDescription>
                By submitting this form, you agree to our verification process and background checks.
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <Button 
        type="submit" 
        className="w-full md:w-auto relative"
        disabled={isSubmitting || !form.getValues("termsAccepted")}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          t("submit")
        )}
      </Button>
    </>
  );
};
