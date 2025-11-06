import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from '@/hooks/useTranslation';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const About = () => {
  const {
    t
  } = useTranslation();
  return <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('aboutUs')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('journeyDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('ourVision')}</h2>
              <p className="text-lg text-gray-700 mb-6">
                {t('visionDesc')}
              </p>
              <p className="text-lg text-gray-700 mb-6">
                {t('ourCommitment')}
              </p>
              <p className="text-lg text-gray-700">
                {t('ourExpansion')}
              </p>
            </div>
            <div className="transform rotate-0 transition-transform duration-300 hover:rotate-6">
              <img alt="SawaRI Vision" src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//trc.gif" className="w-[260px] h-auto drop-shadow-xl ml-[3rem]" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 lg:grid-flow-dense">
            <div className="lg:col-start-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('ourJourney')}</h2>
              <p className="text-lg text-gray-700 mb-6">
                {t('journeyDesc')}
              </p>
              <p className="text-lg text-gray-700 mb-6">
                {t('journeyContext')}
              </p>
              <p className="text-lg text-gray-700">
                {t('journeyProgress')}
              </p>
            </div>
            <div className="transform rotate-0 transition-transform duration-300 hover:-rotate-6">
              <img alt="SawaRI Journey" src="/assets/Image1.png" className="w-[460px] h-auto drop-shadow-xl ml-[3rem]" />
            </div>
          </div>
          
          <div className="bg-[#FD9D00]/10 rounded-3xl p-8 md:p-16 mb-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('meetFounders')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="mb-6 flex justify-center">
                  <Avatar className="w-40 h-40 border-4 border-[#FD9D00]/20">
                    <AvatarImage alt="Raj Kumar" src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//founder-Raj.jpg" className="w-[155px] h-auto object-cover" />
                    <AvatarFallback className="text-3xl font-bold text-[#FD9D00] bg-[#FD9D00]/10">RK</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Mr. Raj Kumar</h3>
                <p className="text-sm text-gray-500 text-center mb-3">{t('founderRaj')}</p>
                <p className="text-sm text-gray-700 text-center">
                  {t('founderRajDesc')}
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="mb-6 flex justify-center">
                  <Avatar className="w-40 h-40 border-4 border-[#FD9D00]/20">
                    <AvatarImage alt="Nitesh Kumar" src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//Made%20with%20insMind-snapedit_1746218282892.jpeg" className="w-[155px] h-auto object-cover" />
                    <AvatarFallback className="text-3xl font-bold text-[#FD9D00] bg-[#FD9D00]/10">NK</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Nitesh Kumar</h3>
                <p className="text-sm text-gray-500 text-center mb-3">
                  {t('founderNitesh')} - <a href="https://www.pagecrafttech.site" target="_blank" rel="noopener noreferrer" className="text-[#FD9D00] hover:underline">PageCraft Tech</a>
                </p>
                <p className="text-sm text-gray-700 text-center">
                  {t('founderNiteshDesc')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="mb-6 flex justify-center">
                  <Avatar className="w-40 h-40 border-4 border-[#FD9D00]/20">
                    <AvatarImage alt="Ankit Mishra" src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//WhatsApp%20Image%202025-05-25%20at%2010.05.18%20PM.jpeg" className="w-[155px] h-auto object-cover" />
                    <AvatarFallback className="text-3xl font-bold text-[#FD9D00] bg-[#FD9D00]/10">AM</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Ankit Mishra</h3>
                <p className="text-sm text-gray-500 text-center mb-3">{t('planningHead')}</p>
                <p className="text-sm text-gray-700 text-center">
                  {t('planningHeadDesc')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('joinJourney')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('journeyInvite')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/waitlist">{t('joinWaitlist')}</Link>
              </Button>
              <Button asChild variant="outline" className="border-[#FD9D00] text-[#FD9D00] hover:text-[#FD9D00] hover:bg-[#FD9D00]/10">
                <Link to="/driver-registration">{t('registerAsDriver')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default About;
