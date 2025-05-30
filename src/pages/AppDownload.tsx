import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation, TranslationKey } from '@/hooks/useTranslation';

const AppDownload = () => {
  const { t } = useTranslation();
  
  const GooglePlayIcon = () => (
    <svg width="24" height="24" viewBox="0 -47.5 135 135" fill="currentColor">
      <path d="M130 40H5c-2.8 0-5-2.2-5-5V5c0-2.8 2.2-5 5-5h125c2.8 0 5 2.2 5 5v30c0 2.8-2.2 5-5 5z" />
      <path d="M27 24.3l-4.1-4.1V19.9l4.1-4.1.1.1 4.9 2.8c1.4.8 1.4 2.1 0 2.9l-5 2.7z" fill="#00a0ff" />
    </svg>
  );
  
  const AppStoreIcon = () => (
    <svg width="24" height="24" viewBox="0 -189.93 539.856 539.856" fill="currentColor">
      <path d="M30.128 19.784c-.029-3.223 2.639-4.791 2.761-4.864-1.511-2.203-3.853-2.504-4.676-2.528-1.967-.207-3.875 1.177-4.877 1.177-1.022 0-2.565-1.157-4.228-1.123-2.14.033-4.142 1.272-5.24 3.196-2.266 3.923-.576 9.688 1.595 12.859 1.086 1.554 2.355 3.287 4.016 3.226 1.625-.066 2.232-1.035 4.193-1.035 1.943 0 2.513 1.035 4.207.996 1.744-.027 2.842-1.56 3.89-3.127 1.255-1.779 1.759-3.533 1.779-3.623-.04-.014-3.386-1.292-3.42-5.154z" />
    </svg>
  );
  
  const features = [
    {
      title: t('reliableTransportation') as string,
      description: t('reliableTransportationDesc') as string
    }, 
    {
      title: t('affordablePricing') as string,
      description: t('affordablePricingDesc') as string
    }, 
    {
      title: t('multipleBookingOptions') as string,
      description: t('multipleBookingOptionsDesc') as string
    }, 
    {
      title: t('safetyFirst') as string,
      description: t('safetyFirstDesc') as string
    }, 
    {
      title: t('supportLocalEconomy') as string,
      description: t('supportLocalEconomyDesc') as string
    }, 
    {
      title: t('designedForRural') as string,
      description: t('designedForRuralDesc') as string
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <span className="inline-block bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
                {t('comingSoon')}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('experienceMobile')}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t('appDevelopmentDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/waitlist">{t('joinWaitlist')}</Link>
                </Button>
                <Button asChild variant="outline" className="border-[#FD9D00] text-[#FD9D00] hover:bg-[#FD9D00]/10">
                  <Link to="/about">{t('learnMore')}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FD9D00] rounded-full opacity-20 blur-3xl" />
              <div className="grid grid-cols-2 gap-4 relative">
                <img alt={t('mapInterface')} src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//main.gif" className="w-[260px] h-auto transform transition-all duration-500 hover:scale-110 hover:rotate-2" />
                <img alt={t('appInterface')} src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//Adobe%20Express%20-%20file.png" className="w-[180px]] h-auto transform transition-all duration-500 hover:scale-110 hover:rotate-2" />
              </div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('appFeatures')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('appFeaturesDesc')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-[#FD9D00]/10 text-[#FD9D00] flex items-center justify-center mb-6">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* App Store Buttons Section */}
          <div className="bg-[#FD9D00]/5 rounded-3xl p-8 md:p-16 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {t('getReadyForLaunch')}
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  {t('appAvailability')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/app-download" className="transform transition-all duration-300 hover:scale-105">
                    <img src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//google-play.png" alt={t('downloadGooglePlay')} className="w-[110px] h-auto transition-transform hover:scale-105 object-cover" />
                  </Link>
                  <Link to="/app-download" className="transform transition-all duration-300 hover:scale-105">
                    <img src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//app-store.png" alt={t('downloadAppStore')} className="w-[110px] h-auto transition-transform hover:scale-105 object-cover" />
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img alt={t('sawaRIApp')} src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//yhyu.gif" className="max-w-[220px] transform transition-all duration-500 hover:scale-110 hover:rotate-3 drop-shadow-2xl animate-float" />
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('beFirstInLine')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('joinCommunity')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/waitlist">{t('joinWaitlist')}</Link>
              </Button>
              <Button asChild className="bg-gray-900 hover:bg-gray-800">
                <Link to="/driver-registration">{t('registerAsDriver')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AppDownload;
