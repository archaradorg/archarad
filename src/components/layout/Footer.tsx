import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-heading text-2xl font-semibold text-primary">
                ArchArad
              </span>
            </Link>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('home.subtitle')}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg text-foreground">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/gallery"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.gallery')}
              </Link>
              <Link
                to="/history"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.history')}
              </Link>
              <Link
                to="/about"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.about')}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg text-foreground">
              {t('about.contact.title')}
            </h4>
            <div className="font-body text-sm text-muted-foreground space-y-2">
              <p>archarad.org</p>
              <p>Arad, Romania</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border">
          <p className="font-body text-xs text-muted-foreground text-center">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};
