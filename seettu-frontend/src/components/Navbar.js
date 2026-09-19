import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';

function Navbar({ onExport }) {
  const { t } = useTranslation();

  return (
    <header className="navbar">
      <div className="logo">Seettu App 💳</div>
      <div className="nav-controls">
        <button className="btn-export" onClick={onExport}>
          {t('common.export')}
        </button>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

export default Navbar;