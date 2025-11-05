import React from 'react';
import { MapPin, Building2, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { motion, useReducedMotion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ReadyToRideSection: React.FC = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [imagesLoaded, setImagesLoaded] = React.useState(0);
  const totalImages = 2;

  const features: Feature[] = [
    {
      icon: <MapPin className="w-6 h-6 text-[#FD9D00]" aria-hidden="true" />,
      title: t('realTimeTracking'),
      description: t('realTimeTrackingDesc')
    }, 
    {
      icon: <Building2 className="w-6 h-6 text-[#FD9D00]" aria-hidden="true" />,
      title: t('securePayments'),
      description: t('securePaymentsDesc')
    }, 
    {
      icon: <Star className="w-6 h-6 text-[#FD9D00]" aria-hidden="true" />,
      title: t('rideOptions'),
      description: t('rideOptionsDesc')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#FD9D00]/5 to-white relative overflow-hidden" aria-labelledby="ready-to-ride-title">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5" aria-hidden="true"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2
            id="ready-to-ride-title"
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FD9D00] to-[#FD7E14]"
          >
            {t('readyToRideTitle')}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            {t('readyToRideSubtitle')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center">
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: [6, 0, 6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[#FD9D00]/5 rounded-[2.5rem]"
                aria-hidden="true"
              />
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: [-3, 0, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[#FD9D00]/10 rounded-[2.5rem]"
                aria-hidden="true"
              />
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: [1, 0, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[#FD9D00]/15 rounded-[2.5rem]"
                aria-hidden="true"
              />

              {imagesLoaded < totalImages && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-[2.5rem]">
                  <div className="w-8 h-8 border-4 border-[#FD9D00] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <div className="relative z-10 flex justify-center space-x-4 md:space-x-8">
                <motion.div
                  // whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: -15, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="transform -rotate-12 -translate-x-2 md:-translate-x-6"
                >
                  <motion.div 
                    className="relative rounded-[2rem] overflow-hidden"
                  >
                    <LazyLoadImage
                      alt="SawaRI ride tracking interface"
                      src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//trd.gif"
                      className="w-48 md:w-80 h-auto object-cover rounded-[2rem] margin-left-8 md:margin-left-9"
                      effect="blur"
                      afterLoad={handleImageLoad}
                      loading="eager"
                    />
                  </motion.div>
                </motion.div>
                
                {/* <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 15, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="transform rotate-12 translate-x-2 md:translate-x-6"
                >
                  <motion.div 
                    className="relative shadow-2xl rounded-[2rem] overflow-hidden"
                    whileHover={{ 
                      boxShadow: "0 25px 50px -12px rgba(253, 157, 0, 0.25)"
                    }}
                  >
                    <LazyLoadImage
                      alt="SawaRI destination selection interface"
                      src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//trc.gif"
                      className="w-48 md:w-64 h-auto object-cover rounded-[2rem]"
                      effect="blur"
                      afterLoad={handleImageLoad}
                      loading="eager"
                    />
                  </motion.div>
                </motion.div> */}
              </div>

              <motion.div
                animate={shouldReduceMotion ? {} : {
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FD9D00]/30 rounded-full blur-3xl"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { x: 5 }}
                className="flex items-start space-x-4 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100/20 transition-all duration-300"
              >
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 10 }}
                  className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#FD9D00]/20 to-[#FD7E14]/20 flex items-center justify-center"
                >
                  {feature.icon}
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <div className="pt-6 flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-start">
              <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.05 }} whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}>
                <Button asChild variant="default" size="lg" className="bg-[#FD9D00] hover:bg-[#FD9D00]/90 text-white w-full sm:w-auto font-medium">
                  <a href="https://play.google.com/store/apps/details?id=com.sawari.app" target="_blank" rel="noopener noreferrer">
                    📱 Download App
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.05 }} whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-[#FD9D00] text-[#FD9D00] hover:bg-[#FD9D00]/10 font-medium">
                  <Link to="/driver-registration">{t('driveWithUs')}</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToRideSection;
