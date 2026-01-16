import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

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

interface PostcardCardProps {
  postcard: Postcard;
  onOpen: (postcard: Postcard) => void;
}

export const PostcardCard: React.FC<PostcardCardProps> = ({ postcard, onOpen }) => {
  const { getLocalizedField, t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  const title = getLocalizedField(postcard, 'title');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="masonry-item group cursor-pointer"
      onClick={() => onOpen(postcard)}
    >
      <div className="bg-card rounded-md overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-secondary animate-pulse ${isLoaded ? 'hidden' : ''}`} />
          <img
            src={postcard.image_url}
            alt={title}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-auto sepia-subtle transition-all duration-500 group-hover:scale-105 group-hover:filter-none ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-heading text-lg text-foreground line-clamp-2">
            {title}
          </h3>
          
          <div className="flex items-center gap-4 text-xs font-body text-muted-foreground">
            {postcard.year && (
              <span className="flex items-center gap-1">
                <span className="opacity-60">{t('gallery.year')}:</span>
                <span>{postcard.year}</span>
              </span>
            )}
            {postcard.district && (
              <span className="flex items-center gap-1">
                <span className="opacity-60">{t('gallery.district')}:</span>
                <span>{postcard.district}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
