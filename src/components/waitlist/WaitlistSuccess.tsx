
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

const WaitlistSuccess = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="bg-white shadow-lg rounded-xl p-8 md:p-12">
        <div className="mb-8">
          <img 
            alt="SawaRI App" 
            src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//yhyu.gif" 
            className="w-25 h-[260px] mx-auto" 
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {t('waitlistSuccess')}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {t('waitlistThankYou')}
        </p>
        <p className="text-gray-500 mb-8">
          {t('waitlistFollow')}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">{t('returnHome')}</Link>
          </Button>
          <Button asChild variant="outline" className="border-[#FD9D00] text-[#FD9D00] hover:text-[#FD9D00] hover:bg-[#FD9D00]/10">
            <Link to="/about">{t('learnMore')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WaitlistSuccess;
