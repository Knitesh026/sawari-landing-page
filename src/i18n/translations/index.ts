
import en from './en';
import hi from './hi';
import bhoj from './bhoj';

export { en, hi, bhoj };

export type Language = 'en' | 'hi' | 'bhoj';
export type TranslationKey = keyof typeof en;
