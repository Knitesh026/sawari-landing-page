import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { debounce } from 'lodash';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    mode: 'onChange', // Enable real-time validation
  });

  // Debounced form validation
  const debouncedValidation = useCallback(
    debounce((values: z.infer<typeof formSchema>) => {
      form.trigger();
    }, 500),
    []
  );

  // Watch form values for real-time validation
  form.watch((values) => {
    if (values) {
      debouncedValidation(values as z.infer<typeof formSchema>);
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setFormStatus('idle');
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          subject: values.subject,
          message: values.message
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to send message');
      }

      setFormStatus('success');
      toast.success(t('messageSent'));
      form.reset();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      if (error.name === 'AbortError') {
        toast.error(t('requestTimeout'));
      } else {
        toast.error(error.message || t('messageFailed'));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('contactUs')}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('contactDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#FD9D00]/10 p-8 rounded-xl flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:bg-[#FD9D00]/15">
              <div className="w-16 h-16 bg-[#FD9D00]/20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
                <Phone className="h-8 w-8 text-[#FD9D00]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('phone')}</h3>
              <p className="text-gray-600 text-center">{t('phoneHours')}</p>
              <a href="tel:+919650636147" className="text-[#FD9D00] font-medium mt-2 hover:underline transition-colors duration-300">
                +91 9650636147
              </a>
            </div>
            
            <div className="bg-[#FD9D00]/10 p-8 rounded-xl flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:bg-[#FD9D00]/15">
              <div className="w-16 h-16 bg-[#FD9D00]/20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
                <Mail className="h-8 w-8 text-[#FD9D00]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('emailUs')}</h3>
              <p className="text-gray-600 text-center">{t('emailResponse')}</p>
              <a href="mailto:support@sawarisewa.in" className="text-[#FD9D00] font-medium mt-2 hover:underline transition-colors duration-300">
                support@sawarisewa.in
              </a>
            </div>
            
            <div className="bg-[#FD9D00]/10 p-8 rounded-xl flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:bg-[#FD9D00]/15">
              <div className="w-16 h-16 bg-[#FD9D00]/20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
                <MapPin className="h-8 w-8 text-[#FD9D00]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('office')}</h3>
              <p className="text-gray-600 text-center">{t('visitUs')}</p>
              <p className="text-[#FD9D00] font-medium mt-2 text-center">Office address :- B 704 mahipalpur New Delhi Near IGI AIRPORT NEW DELHI 110037</p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow-lg rounded-xl p-8 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-6">{t('sendMessage')}</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('nameLabel')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={t('namePlaceholder')} 
                              {...field} 
                              className="transition-all duration-300 focus:ring-2 focus:ring-[#FD9D00]"
                            />
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
                            <Input 
                              placeholder={t('emailPlaceholder')} 
                              {...field}
                              className="transition-all duration-300 focus:ring-2 focus:ring-[#FD9D00]"
                            />
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
                            <Input 
                              placeholder={t('phonePlaceholder')} 
                              {...field}
                              className="transition-all duration-300 focus:ring-2 focus:ring-[#FD9D00]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('subjectLabel')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={t('subjectPlaceholder')} 
                              {...field}
                              className="transition-all duration-300 focus:ring-2 focus:ring-[#FD9D00]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('messageLabel')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('messagePlaceholder')} 
                            className="min-h-[120px] resize-none transition-all duration-300 focus:ring-2 focus:ring-[#FD9D00]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className={`w-full md:w-auto transition-all duration-300 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#FD9D00]/90'
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t('sending')}</span>
                      </div>
                    ) : (
                      t('send')
                    )}
                  </Button>

                  {formStatus === 'success' && (
                    <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
                      {t('messageSent')}
                    </div>
                  )}
                  
                  {formStatus === 'error' && (
                    <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                      {t('messageFailed')}
                    </div>
                  )}
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
