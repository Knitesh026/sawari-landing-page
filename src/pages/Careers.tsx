import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from "@/components/ui/button";
import { checkRateLimit } from '@/lib/rateLimiter';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Careers = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedPosition, setSelectedPosition] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    resume: null as File | null
  });

  const positions = [
    {
      title: t('regionalManagerTitle'),
      description: t('regionalManagerDesc'),
      requirements: t('regionalManagerReq'),
      location: t('locationBihar'),
    },
    {
      title: t('projectManagerTitle'),
      description: t('projectManagerDesc'),
      requirements: t('projectManagerReq'),
      location: t('locationBihar'),
    },
    {
      title: t('socialMediaTitle'),
      description: t('socialMediaDesc'),
      requirements: t('socialMediaReq'),
      location: t('locationRemote'),
    },
    {
      title: t('promotionExecutiveTitle'),
      description: t('promotionExecutiveDesc'),
      requirements: t('promotionExecutiveReq'),
      location: t('locationBihar'),
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Check rate limit using email as identifier
      if (!checkRateLimit(formData.email)) {
        throw new Error('Too many attempts. Please try again in a minute.');
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${apiUrl}/career-application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          position: selectedPosition,
          message: formData.message
        })
      });

      if (!response.ok) {
        let errorMessage = 'Failed to submit application';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      toast({
        variant: "default",
        title: t('applicationSubmitted'),
        description: t('applicationSuccess'),
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        resume: null
      });
      setIsEditDialogOpen(false);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to submit application. Please try again later.'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('careers')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('careersDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {positions.map((position, index) => (
              <Card key={index} className="border-2 border-[#FD9D00]/20 hover:border-[#FD9D00] transition-colors duration-300">
                <CardHeader>
                  <CardTitle>{position.title}</CardTitle>
                  <CardDescription className="text-gray-500">{position.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{position.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">{t('requirements')}:</h4>
                    <p className="text-gray-700">{position.requirements}</p>
                  </div>
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-[#FD9D00] text-[#FD9D00] hover:bg-[#FD9D00]/10"
                        onClick={() => {
                          setSelectedPosition(position.title);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        {t('applyNow')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>{t('applyFor')} {position.title}</DialogTitle>
                        <DialogDescription>{t('fillApplicationForm')}</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">{t('fullName')}</Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">{t('email')}</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">{t('mobile')}</Label>
                          <Input
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">{t('coverLetter')}</Label>
                          <Textarea
                            id="message"
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="resume">{t('resume')}</Label>
                          <Input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            required
                            onChange={(e) => setFormData({...formData, resume: e.target.files?.[0] || null})}
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-[#FD9D00] hover:bg-[#FD9D00]/90 text-white"
                        >
                          {t('submit')}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('whyJoinUs')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3">{t('innovationTitle')}</h3>
                <p className="text-gray-600">{t('innovationDesc')}</p>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3">{t('impactTitle')}</h3>
                <p className="text-gray-600">{t('impactDesc')}</p>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3">{t('growthTitle')}</h3>
                <p className="text-gray-600">{t('growthDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;