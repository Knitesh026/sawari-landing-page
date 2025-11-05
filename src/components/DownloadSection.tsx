import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

const DownloadSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative overflow-hidden py-20 mx-4 md:mx-8 lg:mx-12 my-20">
      <div className="absolute inset-0 bg-[#FD9D00] rounded-[2.5rem] transform rotate-1 scale-105"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#FD9D00] to-[#FD9D00]/90 rounded-[2.5rem]"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyOHYySDI0di0yaDEyek0zNiAyMnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white mb-6 animate-fade-in">
              📱 Mobile App
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight animate-slide-in leading-tight">
              {t('downloadTitle')}
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed animate-fade-in opacity-90 whitespace-pre-line">
              {t('downloadSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-zoom-in">
              <a 
                href="https://play.google.com/store/apps/details?id=com.sawari.app" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="default" className="bg-white text-[#FD9D00] hover:bg-white/90 transform transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                  <span className="flex items-center">
                    <span className="mr-2">📱</span>
                    Download on Google Play
                  </span>
                </Button>
              </a>
              <a 
                href="https://apps.apple.com/app/sawari/id123456789" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="default" className="bg-white text-[#FD9D00] hover:bg-white/90 transform transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                  <span className="flex items-center">
                    <span className="mr-2">🍎</span>
                    Download on App Store
                  </span>
                </Button>
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 grid grid-cols-2 gap-6 lg:gap-8">
              <div className="transform transition-all duration-500 hover:scale-105 hover:-rotate-2">
                <img 
                  alt="SawaRI App Interface" 
                  src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//yhyu.gif" 
                  className="w-full h-auto rounded-2xl animate-float" 
                />
              </div>
              <div className="transform translate-y-12 transition-all duration-500 hover:scale-105 hover:rotate-2">
                <img 
                  alt="SawaRI Map Interface" 
                  src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//Adobe%20Express%20-%20file.png" 
                  className="w-full h-auto rounded-2xl animate-float-delayed" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
