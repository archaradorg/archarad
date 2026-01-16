import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

interface TimelineEvent {
  year: string;
  title: {
    hu: string;
    ro: string;
    en: string;
    de: string;
  };
  description: {
    hu: string;
    ro: string;
    en: string;
    de: string;
  };
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '1131',
    title: {
      hu: 'Első írásos említés',
      ro: 'Prima mențiune documentară',
      en: 'First documented mention',
      de: 'Erste urkundliche Erwähnung',
    },
    description: {
      hu: 'Arad első írásos említése történelmi dokumentumokban.',
      ro: 'Prima mențiune a Aradului în documentele istorice.',
      en: 'First mention of Arad in historical documents.',
      de: 'Erste Erwähnung von Arad in historischen Dokumenten.',
    },
  },
  {
    year: '1551',
    title: {
      hu: 'Oszmán hódítás',
      ro: 'Cucerirea otomană',
      en: 'Ottoman conquest',
      de: 'Osmanische Eroberung',
    },
    description: {
      hu: 'A város az Oszmán Birodalom részévé válik.',
      ro: 'Orașul devine parte a Imperiului Otoman.',
      en: 'The city becomes part of the Ottoman Empire.',
      de: 'Die Stadt wird Teil des Osmanischen Reiches.',
    },
  },
  {
    year: '1699',
    title: {
      hu: 'Habsburg uralom',
      ro: 'Stăpânirea habsburgică',
      en: 'Habsburg rule',
      de: 'Habsburger Herrschaft',
    },
    description: {
      hu: 'Arad a Habsburg Birodalom része lesz a karlócai béke után.',
      ro: 'Aradul devine parte a Imperiului Habsburgic după Pacea de la Karlowitz.',
      en: 'Arad becomes part of the Habsburg Empire after the Treaty of Karlowitz.',
      de: 'Arad wird nach dem Frieden von Karlowitz Teil des Habsburgerreiches.',
    },
  },
  {
    year: '1834',
    title: {
      hu: 'Szabad királyi város',
      ro: 'Oraș liber regal',
      en: 'Free royal city',
      de: 'Freie königliche Stadt',
    },
    description: {
      hu: 'Arad elnyeri a szabad királyi város státuszt.',
      ro: 'Aradul primește statutul de oraș liber regal.',
      en: 'Arad receives the status of free royal city.',
      de: 'Arad erhält den Status einer freien königlichen Stadt.',
    },
  },
  {
    year: '1849',
    title: {
      hu: 'Aradi vértanúk',
      ro: 'Martirii de la Arad',
      en: 'Martyrs of Arad',
      de: 'Die Märtyrer von Arad',
    },
    description: {
      hu: 'Október 6-án kivégezik a 13 aradi vértanút.',
      ro: 'Pe 6 octombrie sunt executați cei 13 martiri ai Aradului.',
      en: 'On October 6, the 13 Martyrs of Arad are executed.',
      de: 'Am 6. Oktober werden die 13 Märtyrer von Arad hingerichtet.',
    },
  },
  {
    year: '1918',
    title: {
      hu: 'Románia része',
      ro: 'Parte a României',
      en: 'Part of Romania',
      de: 'Teil Rumäniens',
    },
    description: {
      hu: 'Arad Románia része lesz az első világháború után.',
      ro: 'Aradul devine parte a României după Primul Război Mondial.',
      en: 'Arad becomes part of Romania after World War I.',
      de: 'Arad wird nach dem Ersten Weltkrieg Teil Rumäniens.',
    },
  },
  {
    year: '1989',
    title: {
      hu: 'Demokratikus átmenet',
      ro: 'Tranziția democratică',
      en: 'Democratic transition',
      de: 'Demokratischer Übergang',
    },
    description: {
      hu: 'A román forradalom és a demokratikus átmenet kezdete.',
      ro: 'Revoluția română și începutul tranziției democratice.',
      en: 'The Romanian Revolution and the beginning of democratic transition.',
      de: 'Die rumänische Revolution und der Beginn des demokratischen Übergangs.',
    },
  },
];

const History: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 lg:py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center space-y-4"
          >
            <h1 className="font-heading text-4xl lg:text-5xl text-foreground">
              {t('history.title')}
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              {t('history.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-px" />

            {/* Events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`relative flex items-start gap-8 lg:gap-16 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Year Marker */}
                  <div className="absolute left-8 lg:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-primary border-4 border-background shadow-sm" />

                  {/* Content Card */}
                  <div className={`ml-16 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <div className="bg-card p-6 rounded-lg shadow-card">
                      <span className="inline-block px-3 py-1 mb-3 text-xs font-body font-medium tracking-wider uppercase bg-secondary text-secondary-foreground rounded-full">
                        {event.year}
                      </span>
                      <h3 className="font-heading text-xl text-foreground mb-2">
                        {event.title[language]}
                      </h3>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed">
                        {event.description[language]}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default History;
