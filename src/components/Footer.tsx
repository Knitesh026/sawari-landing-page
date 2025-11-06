import { Link, useNavigate } from "react-router-dom";
import { Facebook, Twitter, Instagram, Heart, Link as LinkIcon, Linkedin } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';

const IndianFlagSVG = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 60" className="w-6 h-4 inline-block mx-1 animate-pulse">
    <rect width="90" height="20" fill="#FF9933" />
    <rect y="20" width="90" height="20" fill="white">
      <circle cx="45" cy="30" r="7" fill="#000088">
        <circle cx="45" cy="30" r="6" fill="none" stroke="white" strokeWidth="1.5">
          <animate attributeName="r" values="6;7;6" dur="2s" repeatCount="indefinite" />
        </circle>
      </circle>
    </rect>
    <rect y="40" width="90" height="20" fill="#138808" />
  </svg>;

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="w-28 h-12 flex items-center">
              <img 
                src="/assets/SAW RI.gif" 
                alt="SawaRI Logo" 
                className="w-24 h-auto object-cover" 
              />
            </Link>
            <p className="mt-4 text-gray-600">
              Reliable rides, anytime, anywhere. Connecting local communities through safe transportation.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://www.facebook.com/share/1JBawRz4xD/" target="_blank" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/sawari.sewa?igsh=ejdsaW5xd3Y4dTE5" target="_blank" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#"  target="_blank" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <button onClick={() => handleClick('/about')} className="text-base text-gray-600 hover:text-gray-900">
                  {t('aboutUs')}
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/driver-registration')} className="text-base text-gray-600 hover:text-gray-900">
                  {t('driveWithUs')}
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/waitlist')} className="text-base text-gray-600 hover:text-gray-900">
                  {t('joinWaitlist')}
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/contact')} className="text-base text-gray-600 hover:text-gray-900">
                  {t('contact')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <button onClick={() => handleClick('/app-download')} className="text-base text-gray-600 hover:text-gray-900">
                  {t('mobileApp')}
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/waitlist')} className="text-base text-gray-600 hover:text-gray-900">
                  {t('rideWithUs')}
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/about')} className="text-base text-gray-600 hover:text-gray-900">
                  {t('localCommute')}
                </button>
              </li>
              <li>
                <button onClick={() => handleClick('/about')} className="text-base text-gray-600 hover:text-gray-900">
                  {t('villageConnectivity')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Download App
            </h3>
            <div className="mt-4 space-y-4">
              <p className="text-base text-gray-600">
                {t('getTheApp')}
              </p>
              <div className="grid grid-cols-2 gap-4 bg-transparent">
                <img alt="SawaRI App Interface" src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//google-play.png" className="w-[128px] h-auto" />
                <img alt="SawaRI Map Interface" src="https://xnbnrzqbtpvtvwfhvjba.supabase.co/storage/v1/object/public/images//app-store.png" className="w-[128px] h-auto" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-center text-base text-gray-400">
            Develop by <a href="https://www.pagecrafttech.site" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 inline-flex items-center">
              <span>PageCraft Tech</span> <LinkIcon className="h-4 w-4 ml-1" />
            </a> with <Heart className="h-4 w-4 mx-1 text-red-500 inline" /> in <span className="inline-flex items-center">India <IndianFlagSVG /></span>
          </p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-2">
            <button onClick={() => handleClick('/privacy-policy')} className="text-xs text-gray-500 hover:text-gray-700 underline">
              Privacy Policy
            </button>
            <span className="hidden sm:inline">|</span>
            <button onClick={() => handleClick('/terms-of-service')} className="text-xs text-gray-500 hover:text-gray-700 underline">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
