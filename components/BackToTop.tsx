import { useState, useEffect } from 'react';
import { VscChevronUp } from 'react-icons/vsc';
import styles from '@/styles/BackToTop.module.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mainEditor = document.getElementById('main-editor');
    
    const toggleVisibility = () => {
      if (mainEditor && mainEditor.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (mainEditor) {
      mainEditor.addEventListener('scroll', toggleVisibility);
      return () => mainEditor.removeEventListener('scroll', toggleVisibility);
    }
  }, []);

  const scrollToTop = () => {
    const mainEditor = document.getElementById('main-editor');
    if (mainEditor) {
      mainEditor.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={styles.backToTop}
          aria-label="Back to top"
        >
          <VscChevronUp />
        </button>
      )}
    </>
  );
};

export default BackToTop;
