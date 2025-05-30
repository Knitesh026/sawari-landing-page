import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DriverRegistrationForm } from "@/components/driver-registration/DriverRegistrationForm";
import { useTranslation } from "@/hooks/useTranslation";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const DriverRegistration = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-xl p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{t("registerAsDriver")}</h1>
            </div>
            
            <ErrorBoundary>
              <DriverRegistrationForm />
            </ErrorBoundary>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DriverRegistration;
