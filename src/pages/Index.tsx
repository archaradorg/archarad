import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Archive, Clock, BookOpen } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Archive,
      titleKey: 'nav.gallery',
      descKey: 'gallery.subtitle',
      link: '/gallery',
    },
    {
      icon: Clock,
      titleKey: 'nav.history',
      descKey: 'history.subtitle',
      link: '/history',
    },
    {
      icon: BookOpen,
      titleKey: 'nav.about',
      descKey: 'about.subtitle',
      link: '/about',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-transparent" />
        
        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            {/* Decorative Element */}
            <div className="flex justify-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              {t('home.title')}
            </h1>

            <p className="font-heading text-xl md:text-2xl text-muted-foreground italic">
              {t('home.subtitle')}
            </p>

            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t('home.intro')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="gap-2 font-body">
                <Link to="/gallery">
                  {t('home.explore')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-body">
                <Link to="/about">
                  {t('home.learnMore')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <div className="w-2 h-2 rotate-45 border border-border" />
          <div className="flex-1 h-px bg-border" />
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Link
                  to={feature.link}
                  className="group block p-8 bg-card rounded-lg shadow-card hover:shadow-elevated transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="inline-flex p-3 bg-secondary rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    
                    <h3 className="font-heading text-xl text-foreground group-hover:text-primary transition-colors">
                      {t(feature.titleKey)}
                    </h3>
                    
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm font-body text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="font-heading text-2xl md:text-3xl text-foreground italic leading-relaxed">
              "Minden képeslap egy ablak a múltba"
            </p>
            <footer className="mt-4 font-body text-sm text-muted-foreground">
              — ArchArad
            </footer>
          </motion.blockquote>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
