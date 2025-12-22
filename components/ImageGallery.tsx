import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { VscChevronLeft, VscChevronRight, VscClose } from 'react-icons/vsc';

import styles from '@/styles/ImageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
  projectTitle: string;
}

const ImageGallery = ({ images, projectTitle }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex, goToNext, goToPrevious]);

  return (
    <>
      <div className={styles.gallery}>
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.galleryItem}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image}
              alt={`${projectTitle} screenshot ${index + 1}`}
              width={600}
              height={400}
              className={styles.galleryImage}
            />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
        >
          <button className={styles.closeButton} onClick={closeLightbox}>
            <VscClose />
          </button>

          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <VscChevronLeft />
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[selectedIndex]}
              alt={`${projectTitle} screenshot ${selectedIndex + 1}`}
              width={1200}
              height={800}
              className={styles.lightboxImage}
              priority
            />
            <div className={styles.imageCounter}>
              {selectedIndex + 1} / {images.length}
            </div>
          </div>

          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <VscChevronRight />
          </button>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
