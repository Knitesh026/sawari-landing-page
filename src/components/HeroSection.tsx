import React from 'react';
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
    <div className="relative bg-gradient-to-b from-[#FD9D00]/5 via-[#FD9D00]/10 to-white pt-20 pb-12 sm:pt-32 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Desktop Layout: Left Text, Right Mock */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial="initial"
            animate="animate"
            className="lg:col-span-1 text-left z-10"
          >
            <motion.div variants={fadeInUp} className="inline-block">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700 mb-6 hover:bg-green-200 transition-colors duration-200">
                ✨ Now Available 
                <motion.span 
                  className="ml-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  🚀
                </motion.span>
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FD9D00] to-[#FD7E14]"
            >
              {t('heroTitle')}
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg lg:text-lg text-gray-600 leading-relaxed opacity-90 mb-8"
            >
              {t('heroSubtitle')}
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a 
                href="https://play.google.com/store/apps/details?id=com.sawari.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group block hover:opacity-80 transition-opacity duration-300"
              >
                <LazyLoadImage
                  effect="blur"
                  src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//google-play.png"
                  alt={t('downloadGooglePlay')}
                  className="h-12 w-auto transition-all duration-300 transform group-hover:scale-105 cursor-pointer"
                  placeholderSrc="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                />
              </a>
              <a 
                href="https://apps.apple.com/app/sawari/id123456789" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group block hover:opacity-80 transition-opacity duration-300"
              >
                <LazyLoadImage
                  effect="blur"
                  src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//app-store.png"
                  alt={t('downloadAppStore')}
                  className="h-12 w-auto transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg cursor-pointer"
                  placeholderSrc="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                />
              </a>
            </motion.div>
          </motion.div>

          {/* Center Mobile Mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 flex justify-center"
          >
            <LazyLoadImage
              effect="blur"
              src="/assets/757shots_so.png"
              alt={t('appInterface')}
              className="w-auto h-420 rounded-3xl transform hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          <motion.div 
            initial="initial"
            animate="animate"
            className="text-center z-10 mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-block">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700 mb-6 hover:bg-green-200 transition-colors duration-200">
                ✨ Now Available 
                <motion.span 
                  className="ml-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  🚀
                </motion.span>
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FD9D00] to-[#FD7E14]"
            >
              {t('heroTitle')}
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg text-gray-600 leading-relaxed opacity-90 mb-8"
            >
              {t('heroSubtitle')}
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a 
                href="https://play.google.com/store/apps/details?id=com.sawari.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group block hover:opacity-80 transition-opacity duration-300"
              >
                <LazyLoadImage
                  effect="blur"
                  src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//google-play.png"
                  alt={t('downloadGooglePlay')}
                  className="h-12 w-auto transition-all duration-300 transform group-hover:scale-105 mx-auto cursor-pointer"
                  placeholderSrc="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                />
              </a>
              <a 
                href="https://apps.apple.com/app/sawari/id123456789" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group block hover:opacity-80 transition-opacity duration-300"
              >
                <LazyLoadImage
                  effect="blur"
                  src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//app-store.png"
                  alt={t('downloadAppStore')}
                  className="h-12 w-auto transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg mx-auto cursor-pointer"
                  placeholderSrc="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <LazyLoadImage
              effect="blur"
              src="/assets/hhhh.png"
              alt={t('appInterface')}
              className="w-660 h-auto rounded-3xl transform hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
