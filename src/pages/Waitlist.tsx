import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaitlistForm from '@/components/waitlist/WaitlistForm';
import WaitlistSuccess from '@/components/waitlist/WaitlistSuccess';
import WaitlistBenefits from '@/components/waitlist/WaitlistBenefits';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const Waitlist = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitSuccess = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-1 pt-32 pb-16 px-4">
          <WaitlistSuccess />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-2">
                <WaitlistBenefits />
              </div>
              
              <div className="md:col-span-3">
                <ErrorBoundary>
                  <WaitlistForm onSubmitSuccess={handleSubmitSuccess} />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Waitlist;
