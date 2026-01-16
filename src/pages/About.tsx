import React from 'react';
import { motion } from 'framer-motion';
import { Target, BookOpen, Library, Mail } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  const sections = [
    {
      icon: Target,
      titleKey: 'about.mission.title',
      textKey: 'about.mission.text',
    },
    {
      icon: BookOpen,
      titleKey: 'about.methodology.title',
      textKey: 'about.methodology.text',
    },
    {
      icon: Library,
      titleKey: 'about.sources.title',
      textKey: 'about.sources.text',
    },
    {
      icon: Mail,
      titleKey: 'about.contact.title',
      textKey: 'about.contact.text',
    },
  ];

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
              {t('about.title')}
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-lg text-primary">
                    <section.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h2 className="font-heading text-2xl text-foreground">
                    {t(section.titleKey)}
                  </h2>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {t(section.textKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <div className="flex justify-center gap-4">
              <div className="w-16 h-px bg-border" />
              <div className="w-2 h-2 rotate-45 border border-border" />
              <div className="w-16 h-px bg-border" />
            </div>
            <p className="font-heading text-xl text-muted-foreground italic">
              archarad.org
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
