import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const HeroSection = () => {
  const { t } = useTranslation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#FD9D00]/5 via-[#FD9D00]/10 to-white pt-32 pb-16 sm:pt-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="initial"
            animate="animate"
            className="text-center lg:text-left z-10"
          >
            <motion.div variants={fadeInUp} className="inline-block">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-[#FD9D00]/10 text-[#FD9D00] mb-6 hover:bg-[#FD9D00]/20 transition-colors duration-200">
                🎉 {t('comingSoon')} 
                <motion.span 
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FD9D00] to-[#FD7E14]"
            >
              {t('heroTitle')}
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-xl text-gray-600 leading-relaxed opacity-90"
            >
              {t('heroSubtitle')}
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-row sm:flex-row gap-6 justify-center lg:justify-start mt-12"
            >
              <Link to="/app-download" className="group block">
                <LazyLoadImage
                  effect="blur"
                  src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//google-play.png"
                  alt={t('downloadGooglePlay')}
                  className="w-[160px] h-auto transition-all duration-300 transform group-hover:scale-105 rounded-lg"
                  placeholderSrc="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                />
              </Link>
              <Link to="/app-download" className="group block">
                <LazyLoadImage
                  effect="blur"
                  src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//app-store.png"
                  alt={t('downloadAppStore')}
                  className="w-[160px] h-auto transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg rounded-lg"
                  placeholderSrc="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                />
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:absolute lg:right-0 lg:w-1/2 lg:h-full"
          >
            <LazyLoadImage
              effect="blur"
              src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//main.gif"
              alt={t('appInterface')}
              className="w-full h-auto rounded-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
