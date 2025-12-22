import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { VscChevronLeft, VscLink } from 'react-icons/vsc';

import { projects, Project } from '@/data/projects';
import ImageGallery from '@/components/ImageGallery';

import styles from '@/styles/ProjectDetailPage.module.css';

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetailPage = ({ project }: ProjectDetailProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/projects" className={styles.backButton}>
          <VscChevronLeft /> Back to Projects
        </Link>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.subtitle}>{project.description}</p>

        <div className={styles.meta}>
          {project.language && (
            <div className={styles.technologies}>
              {project.language.split(',').map((tech, index) => (
                <span key={index} className={styles.techBadge}>
                  {tech.trim()}
                </span>
              ))}
            </div>
          )}

          {project.link && project.link.startsWith('http') && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveLink}
            >
              <VscLink /> Visit Live Site
            </a>
          )}
        </div>
      </div>

      {project.image && (
        <div className={styles.heroImage}>
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={600}
            className={styles.image}
            priority
          />
        </div>
      )}

      <div className={styles.content}>
        {project.content && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <div className={styles.text}>
              {project.content.split('\\n\\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        {project.features && project.features.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Features</h2>
            <ul className={styles.featureList}>
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        {/* {project.techStack && project.techStack.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Technology Stack</h2>
            <div className={styles.techStackGrid}>
              {project.techStack.map((tech, index) => (
                <div key={index} className={styles.techCard}>
                  {tech}
                </div>
              ))}
            </div>
          </section>
        )} */}

        {project.gallery && project.gallery.length > 1 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Gallery</h2>
            <ImageGallery images={project.gallery} projectTitle={project.title} />
          </section>
        )}
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = projects.find((p) => p.slug === params?.slug);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
      title: project.title,
    },
  };
};

export default ProjectDetailPage;
