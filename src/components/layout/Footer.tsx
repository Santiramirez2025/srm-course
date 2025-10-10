import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600">
        <p className="mb-2">© 2025 Curso SRM - {t('footer.rights')}</p>
        <p className="text-sm">{t('footer.tagline')}</p>
      </div>
    </footer>
  );
};