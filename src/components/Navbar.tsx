import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageToggle from "@/components/LanguageToggle";
import { motion, AnimatePresence } from "framer-motion";

type TranslationKeys =
  | "address"
  | "about"
  | "location"
  | "home"
  | "contact"
  | "waitlist"
  | "registerAsDriver"
  | "fullName"
  | "email"
  | "mobile"
  | "district"
  | "state"
  | "pincode"
  | "licenseNumber"
  // add other keys as needed
  | "requirements";

interface NavItem {
  path: string;
  label: TranslationKeys;
  special?: boolean;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, currentLang, changeLanguage } = useTranslation();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems: NavItem[] = [
    { path: "/", label: "home" },
    { path: "/about", label: "about" },
    { path: "/contact", label: "contact" },
    { path: "/waitlist", label: "waitlist" },
  ];

  const mobileNavItems: NavItem[] = [
    ...navItems,
    { path: "/driver-registration", label: "registerAsDriver", special: true },
  ];
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-[10px] left-[10px] right-[10px] z-50 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/90 backdrop-blur-sm'
      } border border-gray-200/20 rounded-[10px] transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 my-[2px] rounded-3xl lg:px-[19px]">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="flex items-center">
              <img 
                src="/assets/SAW RI.gif" 
                alt="SawaRI Logo" 
                className="h-9 object-contain"
              />
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`relative text-gray-600 hover:text-[#FD9D00] transition-colors ${
                  isActive(item.path) ? 'text-[#FD9D00]' : ''
                }`}
              >
                {t(item.label)}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FD9D00]"
                    initial={false}
                  />
                )}
              </Link>
            ))}
            <LanguageToggle currentLang={currentLang} onLanguageChange={changeLanguage} />
            <Button 
              asChild 
              variant="default"
              className="bg-[#FD9D00] hover:bg-[#FD9D00]/90 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link to="/driver-registration">{t("registerAsDriver")}</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#FD9D00] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FD9D00]"
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200/50 rounded-b-[10px] overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {mobileNavItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      item.special
                        ? 'bg-[#FD9D00] text-white hover:bg-[#FD9D00]/90'
                        : `text-gray-700 hover:text-[#FD9D00] hover:bg-gray-50 ${
                            isActive(item.path) ? 'text-[#FD9D00] bg-[#FD9D00]/5' : ''
                          }`
                    }`}
                    onClick={toggleMenu}
                  >
                    {t(item.label)}
                  </Link>
                </motion.div>
              ))}
              <div className="px-3 py-2">
                <LanguageToggle currentLang={currentLang} onLanguageChange={changeLanguage} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
