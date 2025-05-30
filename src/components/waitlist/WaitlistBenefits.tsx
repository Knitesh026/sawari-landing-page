
import { useTranslation } from '@/hooks/useTranslation';

const WaitlistBenefits = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('joinWaitlist')}</h1>
      <p className="text-lg text-gray-600 mb-6">
        {t('waitlistDesc')}
      </p>
      <div className="bg-[#FD9D00]/10 p-6 rounded-xl mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('whyJoin')}</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="bg-[#FD9D00]/20 text-[#FD9D00] rounded-full p-1 mr-2 mt-0.5">✓</span>
            <span>{t('benefit1')}</span>
          </li>
          <li className="flex items-start">
            <span className="bg-[#FD9D00]/20 text-[#FD9D00] rounded-full p-1 mr-2 mt-0.5">✓</span>
            <span>{t('benefit2')}</span>
          </li>
          <li className="flex items-start">
            <span className="bg-[#FD9D00]/20 text-[#FD9D00] rounded-full p-1 mr-2 mt-0.5">✓</span>
            <span>{t('benefit3')}</span>
          </li>
          <li className="flex items-start">
            <span className="bg-[#FD9D00]/20 text-[#FD9D00] rounded-full p-1 mr-2 mt-0.5">✓</span>
            <span>{t('benefit4')}</span>
          </li>
        </ul>
      </div>
      <div className="hidden md:block">
        <img 
          alt="SawaRI App Interface" 
          src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//yhyu.gif" 
          className="w-[280px] h-full rounded-xl" 
        />
      </div>
    </>
  );
};

export default WaitlistBenefits;
