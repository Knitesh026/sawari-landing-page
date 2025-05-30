import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { checkRateLimit } from '@/lib/rateLimiter';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }).max(50, {
    message: 'Name cannot be longer than 50 characters.'
  }).regex(/^[a-zA-Z\s]+$/, {
    message: 'Name can only contain letters and spaces.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.'
  }).max(15, {
    message: 'Phone number cannot be longer than 15 digits.'
  }).regex(/^[0-9+\-\s]+$/, {
    message: 'Phone number can only contain digits, +, -, and spaces.'
  }),
  location: z.string().min(3, {
    message: 'Please enter your location.'
  }).max(100, {
    message: 'Location cannot be longer than 100 characters.'
  }),
  usageFrequency: z.enum(['daily', 'weekly', 'monthly', 'rarely'], {
    required_error: "Please select how often you'd use our service."
  }),
  marketingConsent: z.boolean().default(false).optional()
});

interface WaitlistFormProps {
  onSubmitSuccess: () => void;
}

const WaitlistForm = ({ onSubmitSuccess }: WaitlistFormProps) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
      usageFrequency: 'weekly',
      marketingConsent: false
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Check rate limit using email as identifier
      if (!checkRateLimit(values.email)) {
        throw new Error('Too many attempts. Please try again in a minute.');
      }

      // Submit to Supabase
      const { error } = await supabase.from('waitlist').insert([{
        name: values.name,
        email: values.email,
        phone: values.phone,
        location: values.location,
        usage_frequency: values.usageFrequency,
        marketing_consent: values.marketingConsent
      }]);
      
      if (error) throw error;

      // Show success message and trigger success callback immediately
      toast.success(t('waitlistSuccess'));
      onSubmitSuccess();

      // Send notification asynchronously without blocking
      fetch(`${import.meta.env.VITE_API_URL}/api/waitlist-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          location: values.location,
          usage_frequency: values.usageFrequency,
          marketing_consent: values.marketingConsent
        }),
      }).catch(error => {
        console.error("Error sending waitlist notification:", error);
        // Don't show error to user since the main submission was successful
      });
      
    } catch (error: any) {
      console.error("Error submitting waitlist form:", error);
      toast.error(`Error: ${error.message || 'Failed to submit form'}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('fullName')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('namePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('emailPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('mobile')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('phonePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('location')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('locationPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="usageFrequency"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t('usageFrequency')}</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="daily" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('daily')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="weekly" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('weekly')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="monthly" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('monthly')}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="rarely" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {t('rarely')}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="marketingConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {t('marketingConsent')}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full md:w-auto relative"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('submitting')}
              </>
            ) : (
              t('submitWaitlist')
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default WaitlistForm;
