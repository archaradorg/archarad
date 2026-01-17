import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PostcardCard } from '@/components/gallery/PostcardCard';
import { Lightbox } from '@/components/gallery/Lightbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface Postcard {
  id: string;
  title_hu: string;
  title_ro: string;
  title_en: string;
  title_de: string;
  year: number | null;
  district: string | null;
  description_hu: string | null;
  description_ro: string | null;
  description_en: string | null;
  description_de: string | null;
  image_url: string;
}

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [postcards, setPostcards] = useState<Postcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostcard, setSelectedPostcard] = useState<Postcard | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    fetchPostcards();
  }, []);

  const fetchPostcards = async () => {
    try {
      const { data, error } = await supabase
        .from('postcards')
        .select('*')
        .order('year', { ascending: false });

      if (error) throw error;
      setPostcards(data || []);
    } catch {
      // Error handled silently - user sees empty gallery
    } finally {
      setLoading(false);
    }
  };

  const handleOpenLightbox = (postcard: Postcard) => {
    const index = postcards.findIndex((p) => p.id === postcard.id);
    setSelectedPostcard(postcard);
    setSelectedIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedPostcard(null);
    setSelectedIndex(-1);
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedPostcard(postcards[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (selectedIndex < postcards.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedPostcard(postcards[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

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
              {t('gallery.title')}
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              {t('gallery.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : postcards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="font-body text-lg text-muted-foreground">
                {t('gallery.noItems')}
              </p>
            </motion.div>
          ) : (
            <div className="masonry-grid">
              {postcards.map((postcard) => (
                <PostcardCard
                  key={postcard.id}
                  postcard={postcard}
                  onOpen={handleOpenLightbox}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        postcard={selectedPostcard}
        onClose={handleCloseLightbox}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={selectedIndex > 0}
        hasNext={selectedIndex < postcards.length - 1}
      />
    </Layout>
  );
};

export default Gallery;
