import React, { useState, useEffect } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
}

const CONSENT_KEY = 'convertly-consent';
const CONSENT_DATE_KEY = 'convertly-consent-date';
const CONSENT_EXPIRES_DAYS = 180;

export const ConsentManager: React.FC = () => {
  const { t } = useI18n();
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true, // Always true
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    checkConsentStatus();
  }, []);

  const checkConsentStatus = () => {
    const consent = localStorage.getItem(CONSENT_KEY);
    const consentDate = localStorage.getItem(CONSENT_DATE_KEY);
    
    if (!consent || !consentDate) {
      setShowBanner(true);
      return;
    }

    const consentTime = new Date(consentDate).getTime();
    const expiryTime = consentTime + (CONSENT_EXPIRES_DAYS * 24 * 60 * 60 * 1000);
    
    if (Date.now() > expiryTime) {
      setShowBanner(true);
      return;
    }

    try {
      const saved = JSON.parse(consent);
      setPreferences(saved);
      updateGoogleConsent(saved);
    } catch {
      setShowBanner(true);
    }
  };

  const updateGoogleConsent = (prefs: ConsentPreferences) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.advertising ? 'granted' : 'denied',
        ad_user_data: prefs.advertising ? 'granted' : 'denied',
        ad_personalization: prefs.advertising ? 'granted' : 'denied',
      });
    }
  };

  const saveConsent = (prefs: ConsentPreferences) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
    localStorage.setItem(CONSENT_DATE_KEY, new Date().toISOString());
    setPreferences(prefs);
    updateGoogleConsent(prefs);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, advertising: true });
  };

  const rejectAll = () => {
    saveConsent({ necessary: true, analytics: false, advertising: false });
  };

  const openPreferences = () => {
    setShowPreferences(true);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg z-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">{t('consentTitle')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('consentDescription')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm" onClick={rejectAll}>
                {t('rejectAll')}
              </Button>
              <Button variant="outline" size="sm" onClick={openPreferences}>
                {t('managePreferences')}
              </Button>
              <Button size="sm" onClick={acceptAll}>
                {t('acceptAll')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Dialog */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('consentTitle')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              {t('consentDescription')}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t('necessary')}</div>
                  <div className="text-sm text-muted-foreground">
                    Required for basic functionality
                  </div>
                </div>
                <Switch checked={true} disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t('analytics')}</div>
                  <div className="text-sm text-muted-foreground">
                    Help us improve the service
                  </div>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, analytics: checked })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t('advertising')}</div>
                  <div className="text-sm text-muted-foreground">
                    Personalized ads to support the service
                  </div>
                </div>
                <Switch
                  checked={preferences.advertising}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, advertising: checked })
                  }
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPreferences(false)}>
                Cancel
              </Button>
              <Button onClick={() => saveConsent(preferences)}>
                {t('save')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Global consent initialization
export const initializeConsent = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    });
  }
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}