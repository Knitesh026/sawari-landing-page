import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Smartphone, Star } from 'lucide-react';

const HowItWorksSection = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      number: "1",
      title: t('realTimeTracking'),
      description: t('realTimeTrackingDesc'),
      icon: <MapPin className="w-6 h-6" />
    }, 
    {
      number: "2",
      title: t('securePayments'),
      description: t('securePaymentsDesc'),
      icon: <CreditCard className="w-6 h-6" />
    }, 
    {
      number: "3",
      title: t('rideOptions'),
      description: t('rideOptionsDesc'),
      icon: <Smartphone className="w-6 h-6" />
    }, 
    {
      number: "4",
      title: t('driverRatings'),
      description: t('driverRatingsDesc'),
      icon: <Star className="w-6 h-6" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyOHYySDI0di0yaDEyek0zNiAyMnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-[#FD9D00]/10 text-[#FD9D00] mb-6"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="inline-block mr-2"
            >
              🔄
            </motion.span>
            Process
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#FD9D00] to-[#FD7E14]">
            {t('howItWorksTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('howItWorksSubtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {features.slice(0, 2).map(feature => (
              <motion.div
                key={feature.number}
                variants={itemVariants}
                whileHover={{ x: -5 }}
                className="text-left lg:text-right"
              >
                <div className="flex items-center space-x-4 lg:flex-row-reverse lg:space-x-reverse">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#FD9D00]/20 to-[#FD7E14]/20 text-[#FD9D00] text-xl font-semibold flex items-center justify-center"
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
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto"
          >
            <div className="relative w-64 h-[500px]">
              <motion.div
                animate={{ rotate: [6, 0, 6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[#FD9D00]/5 rounded-[2.5rem] transform"
              ></motion.div>
              <motion.div
                animate={{ rotate: [-3, 0, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[#FD9D00]/10 rounded-[2.5rem] transform"
              ></motion.div>
              <motion.div
                animate={{ rotate: [1, 0, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[#FD9D00]/15 rounded-[2.5rem] transform"
              ></motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10 w-full h-full"
              >
                <img
                  alt="SawaRI App Interface"
                  src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//main.gif"
                  className="w-full h-full rounded-[2.5rem] object-cover"
                />
              </motion.div>

              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-20 h-20 bg-[#FD9D00]/20 rounded-full opacity-20"
              ></motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 w-16 h-16 bg-[#FD9D00]/30 rounded-full opacity-20"
              ></motion.div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FD9D00]/40 rounded-full opacity-10 blur-3xl"
            ></motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {features.slice(2).map(feature => (
              <motion.div
                key={feature.number}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className="text-left"
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -10 }}
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#FD9D00]/20 to-[#FD7E14]/20 text-[#FD9D00] text-xl font-semibold flex items-center justify-center"
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
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
