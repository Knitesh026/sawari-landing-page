
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from 'lucide-react';
import { useTranslation } from "@/hooks/useTranslation";

const DriverSuccess = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white shadow-lg rounded-xl p-8 md:p-12">
            <div className="flex justify-center mb-8">
              <CheckCircle className="h-24 w-24 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('applicationSuccess')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('applicationSuccessDesc')}
            </p>
            <p className="text-gray-500 mb-8">
              {t('readyForVerification')}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/">{t('returnHome')}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">{t('contactSupport')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DriverSuccess;
