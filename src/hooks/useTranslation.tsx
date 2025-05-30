
import { useTranslation as useTranslationFromProvider } from '@/i18n/TranslationProvider';
export { TranslationProvider } from '@/i18n/TranslationProvider';
export type { TranslationContextType } from '@/i18n/TranslationProvider';
export { type Language, type TranslationKey } from '@/i18n/translations';

// Re-export the hook to maintain backward compatibility
export const useTranslation = useTranslationFromProvider;
