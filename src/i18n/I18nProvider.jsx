"use client";

import { createContext, useContext } from 'react';
import { DEFAULT_BUSINESS } from '../data/business';

const I18nContext = createContext(null);

// `dict` comes from the server layout (see client-dictionary.js) so the full two-language
// dictionary module is never bundled into client JavaScript.
export function I18nProvider({ lang, dict, business = DEFAULT_BUSINESS, children }) {
  return (
    <I18nContext.Provider value={{ lang, dict, business }}>
      {children}
    </I18nContext.Provider>
  );
}

/** The business's contact details (src/data/business.js), as edited in the admin panel. */
export function useBusiness() {
  return useContext(I18nContext)?.business || DEFAULT_BUSINESS;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
