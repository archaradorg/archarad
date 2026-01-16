import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'hu' | 'ro' | 'en' | 'de';

interface Translations {
  [key: string]: {
    hu: string;
    ro: string;
    en: string;
    de: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': {
    hu: 'Főoldal',
    ro: 'Acasă',
    en: 'Home',
    de: 'Startseite',
  },
  'nav.gallery': {
    hu: 'Galéria',
    ro: 'Galerie',
    en: 'Gallery',
    de: 'Galerie',
  },
  'nav.history': {
    hu: 'Történelem',
    ro: 'Istorie',
    en: 'History',
    de: 'Geschichte',
  },
  'nav.about': {
    hu: 'Rólunk',
    ro: 'Despre',
    en: 'About',
    de: 'Über uns',
  },
  // Home page
  'home.title': {
    hu: 'Arad Digitális Archívuma',
    ro: 'Arhiva Digitală a Aradului',
    en: 'Digital Archive of Arad',
    de: 'Digitales Archiv von Arad',
  },
  'home.subtitle': {
    hu: 'Képeslapok és emlékek gyűjteménye',
    ro: 'Colecție de cărți poștale și amintiri',
    en: 'A collection of postcards and memories',
    de: 'Eine Sammlung von Postkarten und Erinnerungen',
  },
  'home.intro': {
    hu: 'Fedezze fel Arad gazdag történelmét egyedülálló képeslapgyűjteményünkön keresztül. Ez a digitális archívum megőrzi és megosztja a város kulturális örökségét.',
    ro: 'Descoperiți istoria bogată a Aradului prin colecția noastră unică de cărți poștale. Această arhivă digitală păstrează și împărtășește patrimoniul cultural al orașului.',
    en: 'Discover the rich history of Arad through our unique collection of postcards. This digital archive preserves and shares the cultural heritage of the city.',
    de: 'Entdecken Sie die reiche Geschichte von Arad durch unsere einzigartige Postkartensammlung. Dieses digitale Archiv bewahrt und teilt das kulturelle Erbe der Stadt.',
  },
  'home.explore': {
    hu: 'Galéria felfedezése',
    ro: 'Explorează galeria',
    en: 'Explore the Gallery',
    de: 'Galerie erkunden',
  },
  'home.learnMore': {
    hu: 'Tudjon meg többet',
    ro: 'Aflați mai multe',
    en: 'Learn More',
    de: 'Mehr erfahren',
  },
  // Gallery
  'gallery.title': {
    hu: 'Képeslapgyűjtemény',
    ro: 'Colecție de cărți poștale',
    en: 'Postcard Collection',
    de: 'Postkartensammlung',
  },
  'gallery.subtitle': {
    hu: 'Böngésszen Arad történelmi képeslapjai között',
    ro: 'Răsfoiți cărțile poștale istorice ale Aradului',
    en: 'Browse through historic postcards of Arad',
    de: 'Durchstöbern Sie historische Postkarten von Arad',
  },
  'gallery.noItems': {
    hu: 'Még nincsenek képeslapok az archívumban.',
    ro: 'Nu există încă cărți poștale în arhivă.',
    en: 'No postcards in the archive yet.',
    de: 'Noch keine Postkarten im Archiv.',
  },
  'gallery.year': {
    hu: 'Év',
    ro: 'An',
    en: 'Year',
    de: 'Jahr',
  },
  'gallery.district': {
    hu: 'Kerület',
    ro: 'Cartier',
    en: 'District',
    de: 'Bezirk',
  },
  // History
  'history.title': {
    hu: 'Arad története',
    ro: 'Istoria Aradului',
    en: 'History of Arad',
    de: 'Geschichte von Arad',
  },
  'history.subtitle': {
    hu: 'Időutazás a város múltjába',
    ro: 'O călătorie în timp prin trecutul orașului',
    en: 'A journey through the city\'s past',
    de: 'Eine Zeitreise durch die Vergangenheit der Stadt',
  },
  // About
  'about.title': {
    hu: 'A projektről',
    ro: 'Despre proiect',
    en: 'About the Project',
    de: 'Über das Projekt',
  },
  'about.subtitle': {
    hu: 'Módszertan, források és kapcsolat',
    ro: 'Metodologie, surse și contact',
    en: 'Methodology, sources, and contact',
    de: 'Methodik, Quellen und Kontakt',
  },
  'about.mission.title': {
    hu: 'Küldetésünk',
    ro: 'Misiunea noastră',
    en: 'Our Mission',
    de: 'Unsere Mission',
  },
  'about.mission.text': {
    hu: 'Az ArchArad célja Arad város kulturális örökségének digitális megőrzése és hozzáférhetővé tétele a nagyközönség számára. Gyűjteményünk folyamatosan bővül új anyagokkal.',
    ro: 'Misiunea ArchArad este de a păstra digital și de a face accesibil publicului larg patrimoniul cultural al orașului Arad. Colecția noastră se extinde continuu cu materiale noi.',
    en: 'ArchArad aims to digitally preserve and make accessible the cultural heritage of the city of Arad. Our collection is continuously expanding with new materials.',
    de: 'ArchArad zielt darauf ab, das kulturelle Erbe der Stadt Arad digital zu bewahren und der Öffentlichkeit zugänglich zu machen. Unsere Sammlung wird ständig mit neuen Materialien erweitert.',
  },
  'about.methodology.title': {
    hu: 'Módszertan',
    ro: 'Metodologie',
    en: 'Methodology',
    de: 'Methodik',
  },
  'about.methodology.text': {
    hu: 'A képeslapokat nagy felbontásban digitalizáljuk, metaadatokkal látjuk el, és négy nyelven dokumentáljuk. Minden anyagot gondosan ellenőrzünk és katalogizálunk.',
    ro: 'Cărțile poștale sunt digitalizate în rezoluție înaltă, prevăzute cu metadate și documentate în patru limbi. Toate materialele sunt verificate și catalogate cu atenție.',
    en: 'Postcards are digitized in high resolution, provided with metadata, and documented in four languages. All materials are carefully verified and catalogued.',
    de: 'Die Postkarten werden in hoher Auflösung digitalisiert, mit Metadaten versehen und in vier Sprachen dokumentiert. Alle Materialien werden sorgfältig geprüft und katalogisiert.',
  },
  'about.sources.title': {
    hu: 'Források',
    ro: 'Surse',
    en: 'Sources',
    de: 'Quellen',
  },
  'about.sources.text': {
    hu: 'Gyűjteményünk magángyűjtőktől, múzeumoktól és archívumoktól származó anyagokat tartalmaz. Minden forrást megfelelően hivatkozunk és dokumentálunk.',
    ro: 'Colecția noastră conține materiale de la colecționari privați, muzee și arhive. Toate sursele sunt citate și documentate corespunzător.',
    en: 'Our collection contains materials from private collectors, museums, and archives. All sources are properly cited and documented.',
    de: 'Unsere Sammlung enthält Materialien von Privatsammlern, Museen und Archiven. Alle Quellen werden ordnungsgemäß zitiert und dokumentiert.',
  },
  'about.contact.title': {
    hu: 'Kapcsolat',
    ro: 'Contact',
    en: 'Contact',
    de: 'Kontakt',
  },
  'about.contact.text': {
    hu: 'Ha kérdése van vagy hozzá szeretne járulni az archívumhoz, kérjük, lépjen kapcsolatba velünk.',
    ro: 'Dacă aveți întrebări sau doriți să contribuiți la arhivă, vă rugăm să ne contactați.',
    en: 'If you have questions or would like to contribute to the archive, please contact us.',
    de: 'Wenn Sie Fragen haben oder zum Archiv beitragen möchten, kontaktieren Sie uns bitte.',
  },
  // Admin
  'admin.title': {
    hu: 'Adminisztráció',
    ro: 'Administrare',
    en: 'Administration',
    de: 'Verwaltung',
  },
  'admin.upload': {
    hu: 'Új képeslap feltöltése',
    ro: 'Încarcă carte poștală nouă',
    en: 'Upload New Postcard',
    de: 'Neue Postkarte hochladen',
  },
  'admin.save': {
    hu: 'Mentés',
    ro: 'Salvează',
    en: 'Save',
    de: 'Speichern',
  },
  'admin.cancel': {
    hu: 'Mégse',
    ro: 'Anulează',
    en: 'Cancel',
    de: 'Abbrechen',
  },
  'admin.login': {
    hu: 'Bejelentkezés',
    ro: 'Autentificare',
    en: 'Login',
    de: 'Anmelden',
  },
  'admin.logout': {
    hu: 'Kijelentkezés',
    ro: 'Deconectare',
    en: 'Logout',
    de: 'Abmelden',
  },
  'admin.email': {
    hu: 'E-mail cím',
    ro: 'Adresă de email',
    en: 'Email address',
    de: 'E-Mail-Adresse',
  },
  'admin.password': {
    hu: 'Jelszó',
    ro: 'Parolă',
    en: 'Password',
    de: 'Passwort',
  },
  // Footer
  'footer.copyright': {
    hu: '© 2024 ArchArad. Minden jog fenntartva.',
    ro: '© 2024 ArchArad. Toate drepturile rezervate.',
    en: '© 2024 ArchArad. All rights reserved.',
    de: '© 2024 ArchArad. Alle Rechte vorbehalten.',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getLocalizedField: <T extends Record<string, any>>(obj: T, field: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('archarad-language');
      if (saved && ['hu', 'ro', 'en', 'de'].includes(saved)) {
        return saved as Language;
      }
    }
    return 'hu';
  });

  useEffect(() => {
    localStorage.setItem('archarad-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  const getLocalizedField = <T extends Record<string, any>>(obj: T, field: string): string => {
    const fieldKey = `${field}_${language}` as keyof T;
    return (obj[fieldKey] as string) || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLocalizedField }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
