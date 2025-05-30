import React from 'react';
import { LayoutGrid, Shield, Clock, Users } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: t("easyToUse"),
      description: t("easyToUseDesc"),
      color: "from-orange-400/20 to-orange-500/20"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t("safeSecure"),
      description: t("safeSecureDesc"),
      color: "from-green-400/20 to-green-500/20"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t("service247"),
      description: t("service247Desc"),
      color: "from-blue-400/20 to-blue-500/20"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t("greatCommunity"),
      description: t("greatCommunityDesc"),
      color: "from-purple-400/20 to-purple-500/20"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-32 bg-gradient-to-b from-[#FD9D00]/5 via-white to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-[#FD9D00]/10 text-[#FD9D00] mb-6"
          >
            <motion.span
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="inline-block mr-2"
            >
              ✨
            </motion.span> 
            Features
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#FD9D00] to-[#FD7E14]">
            {t('featuresTitle')}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('featuresSubtitle')}
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/10 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-xl bg-[#FD9D00]/10 text-[#FD9D00] flex items-center justify-center mb-6 transition-transform duration-300"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
