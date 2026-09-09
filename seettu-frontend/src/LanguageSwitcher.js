import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css'; 

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="lang-dropdown-container" style={{ padding: '20px' }}>

      <select 
        className="lang-select" 
        onChange={handleLanguageChange} 
        value={i18n.language}
      >
        <option value="en">English</option>
        <option value="si">සිංහල</option>
        <option value="ta">தமிழ்</option>
      </select>

      
    </div>
  );
}

export default LanguageSwitcher;