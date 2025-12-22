import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import Head from '@/components/Head';

import '@/styles/globals.css';
import '@/styles/themes.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, []);

  // Track visitor on route change
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await fetch('/api/track-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: window.location.pathname,
          }),
        });
      } catch (error) {
        console.error('Failed to track visitor:', error);
      }
    };

    // Track initial visit
    trackVisitor();

    // Track route changes
    const handleRouteChange = () => {
      trackVisitor();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Layout>
      <Head title={`Anggi Juhniawan | ${pageProps.title}`} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
