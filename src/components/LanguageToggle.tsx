
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Language } from "@/hooks/useTranslation";

interface LanguageToggleProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageToggle = ({ currentLang, onLanguageChange }: LanguageToggleProps) => {
  const languageNames = {
    en: "English",
    hi: "हिंदी",
    bhoj: "भोजपुरी"
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2" size="sm">
          <Globe className="h-4 w-4" />
          <span>{languageNames[currentLang]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem onClick={() => onLanguageChange('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLanguageChange('hi')}>
          हिंदी
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLanguageChange('bhoj')}>
          भोजपुरी
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
