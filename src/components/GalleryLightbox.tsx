import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryImage {
  src: string;
  title: string;
  category: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onSelectIndex,
}) => {
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onSelectIndex((currentIndex + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex((currentIndex - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onSelectIndex]);

  if (currentIndex === null) return null;

  const currentImage = images[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex + 1) % images.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(5, 7, 8, 0.94)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid var(--gold-border)',
          borderRadius: 'var(--radius-full)',
          color: 'var(--text-ivory)',
          cursor: 'pointer',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 310,
        }}
      >
        <X size={22} />
      </button>

      {/* Prev button */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous photo"
        style={{
          position: 'absolute',
          left: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid var(--gold-border)',
          borderRadius: 'var(--radius-full)',
          color: 'var(--text-ivory)',
          cursor: 'pointer',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 310,
        }}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Image and Caption Container */}
      <div
        style={{
          maxWidth: '1000px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 305,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.title}
          style={{
            maxWidth: '100%',
            maxHeight: '72vh',
            objectFit: 'contain',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(221, 180, 107, 0.15)',
            border: '1px solid rgba(221, 180, 107, 0.2)',
          }}
        />

        <div
          style={{
            marginTop: '1.25rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--gold-metallic)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 600,
            }}
          >
            {currentImage.category} · {currentIndex + 1} of {images.length}
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-ivory)' }}>
            {currentImage.title}
          </div>
        </div>
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next photo"
        style={{
          position: 'absolute',
          right: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid var(--gold-border)',
          borderRadius: 'var(--radius-full)',
          color: 'var(--text-ivory)',
          cursor: 'pointer',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 310,
        }}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};
