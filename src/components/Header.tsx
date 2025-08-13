
import React from 'react';
import { useI18n } from '../contexts/I18nContext';
import { Link, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { languages, SupportedLanguage } from '../lib/i18n';

const Header = () => {
  const { language, setLanguage, t } = useI18n();
  const location = useLocation();

  return (
    <header className="bg-background shadow-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Convertly</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('home')}
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/about' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('about')}
            </Link>
            <Link 
              to="/faq" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/faq' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('faq')}
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="text-sm border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('home')}
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/about' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('about')}
          </Link>
          <Link 
            to="/faq" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/faq' 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('faq')}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
