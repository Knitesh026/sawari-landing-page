
import { UseFormReturn } from "react-hook-form";
import { TranslationKey } from "@/hooks/useTranslation";

export interface FormFieldProps {
  form: UseFormReturn<any>;
  t: (key: TranslationKey) => string;
}
