import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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

interface LightboxProps {
  postcard: Postcard | null;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export const Lightbox: React.FC<LightboxProps> = ({
  postcard,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}) => {
  const { getLocalizedField, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) onPrevious();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
    };

    if (postcard) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [postcard, onClose, onPrevious, onNext, hasPrevious, hasNext]);

  if (!postcard) return null;

  const title = getLocalizedField(postcard, 'title');
  const description = getLocalizedField(postcard, 'description');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-primary/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Navigation Arrows */}
        {hasPrevious && onPrevious && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors z-10"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
        )}

        {hasNext && onNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors z-10"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        )}

        {/* Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-5xl w-full max-h-[90vh] overflow-auto bg-card rounded-lg shadow-elevated"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <img
                src={postcard.image_url}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-6 lg:p-8 space-y-6 flex flex-col justify-center">
              <h2 className="font-heading text-2xl lg:text-3xl text-foreground">
                {title}
              </h2>

              <div className="flex flex-wrap gap-4 text-sm font-body">
                {postcard.year && (
                  <div className="px-3 py-1.5 bg-secondary rounded-full">
                    <span className="text-muted-foreground">{t('gallery.year')}:</span>{' '}
                    <span className="text-foreground font-medium">{postcard.year}</span>
                  </div>
                )}
                {postcard.district && (
                  <div className="px-3 py-1.5 bg-secondary rounded-full">
                    <span className="text-muted-foreground">{t('gallery.district')}:</span>{' '}
                    <span className="text-foreground font-medium">{postcard.district}</span>
                  </div>
                )}
              </div>

              {description && (
                <p className="font-body text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
