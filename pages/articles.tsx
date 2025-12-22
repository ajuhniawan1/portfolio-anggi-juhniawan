import ArticleCard from '@/components/ArticleCard';

import { Article } from '@/types';

import styles from '@/styles/ArticlesPage.module.css';

interface ArticlesPageProps {
  articles: Article[];
}

const ArticlesPage = ({ articles }: ArticlesPageProps) => {
  return (
    <div className={styles.layout}>
      <h1 className={styles.pageTitle}>My Articles</h1>
      <p className={styles.pageSubtitle}>
        Recent posts from{' '}
        <a
          href="https://dev.to/itsnitinr"
          target="_blank"
          rel="noopener"
          className={styles.underline}
        >
          dev.to
        </a>{' '}
        where I share insights and tutorials about web development.
      </p>
      <div className={styles.container}>
        {articles.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '2rem', color: '#888' }}>
            No articles found. Please configure DEV_TO_API_KEY in .env.local
          </p>
        ) : (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        )}
      </div>
    </div>
  );
};

// Dummy data for demonstration
const dummyArticles: Article[] = [
  {
    id: '1',
    title: 'I built a social network for developers to showcase their projects',
    description: 'TL;DR: Driwwwle is an open-source social network to showcase your projects with like, comments,...',
    cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--Z1gDnqYW--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/example1.png',
    url: 'https://dev.to/example1',
    page_views_count: 4822,
    public_reactions_count: 171,
    comments_count: 21,
  },
  {
    id: '2',
    title: '5 NPM Packages to Secure Your Node.js Backend in 5 Minutes',
    description: 'When you start to focus on the performance and security of your backend alongside the other features,...',
    cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--qQiE0R7r--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/example2.png',
    url: 'https://dev.to/example2',
    page_views_count: 11394,
    public_reactions_count: 217,
    comments_count: 10,
  },
  {
    id: '3',
    title: 'I Built a VSCode Inspired Developer Portfolio',
    description: 'The Idea &amp; Inspiration Truth be told, I\'ve lost count of the number of amazing portfol...',
    cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--gn0kYTMF--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/example3.png',
    url: 'https://dev.to/example3',
    page_views_count: 21863,
    public_reactions_count: 316,
    comments_count: 85,
  },
  {
    id: '4',
    title: '5 Key Takeaways from my First Freelance Project',
    description: 'Getting your first client as a freelancer is usually a giant stepping stone that a lot of the develop...',
    cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--aW5gLfFD--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/example4.png',
    url: 'https://dev.to/example4',
    page_views_count: 1968,
    public_reactions_count: 58,
    comments_count: 7,
  },
  {
    id: '5',
    title: 'Build A Crypto Discord Bot using Discord.js',
    description: 'Discord is one of the best platforms for developers to communicate for multiple reasons: the ability...',
    cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--uy0G2OZo--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/example5.png',
    url: 'https://dev.to/example5',
    page_views_count: 1266,
    public_reactions_count: 18,
    comments_count: 1,
  },
  {
    id: '6',
    title: 'You Need to Try These 10 NPM Packages as a React Developer',
    description: 'As web developers, we tend to make use of several NPM packages on a daily basis for different reasons...',
    cover_image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--pkjOdSeL--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/example6.png',
    url: 'https://dev.to/example6',
    page_views_count: 10681,
    public_reactions_count: 589,
    comments_count: 34,
  },
];

export async function getStaticProps() {
  // If no API key, use dummy data for build
  if (!process.env.DEV_TO_API_KEY) {
    return {
      props: { title: 'Articles', articles: dummyArticles },
    };
  }

  try {
    const res = await fetch(
      'https://dev.to/api/articles/me/published?per_page=6',
      {
        headers: {
          'api-key': process.env.DEV_TO_API_KEY,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }

    const data = await res.json();

    return {
      props: {
        title: 'Articles',
        articles: Array.isArray(data) && data.length > 0 ? data : dummyArticles,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return {
      props: { title: 'Articles', articles: dummyArticles },
      revalidate: 60,
    };
  }
}

export default ArticlesPage;
