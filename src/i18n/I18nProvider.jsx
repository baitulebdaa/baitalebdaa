"use client";

import { createContext, useContext } from 'react';

const I18nContext = createContext(null);

// `dict` comes from the server layout (see client-dictionary.js) so the full two-language
// dictionary module is never bundled into client JavaScript.
export function I18nProvider({ lang, dict, children }) {
  return (
    <I18nContext.Provider value={{ lang, dict }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
