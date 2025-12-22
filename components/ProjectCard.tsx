import Image from 'next/image';
import Link from 'next/link';
import { VscCode } from 'react-icons/vsc';

import { Project } from '@/types';

import styles from '@/styles/ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  onLanguageClick?: (language: string) => void;
}

const ProjectCard = ({ project, onLanguageClick }: ProjectCardProps) => {
  const hasExternalLink = project.link && project.link.startsWith('http');
  const projectUrl = hasExternalLink ? project.link : `/projects/${project.slug}`;

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (hasExternalLink) {
      return (
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={projectUrl} className={styles.card}>
        {children}
      </Link>
    );
  };

  return (
    <CardWrapper>
      {project.image && (
        <div className={styles.imageWrapper}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className={styles.image}
          />
          {project.language && (
            <div className={styles.languageBadge}>
              <VscCode /> {project.language}
            </div>
          )}
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        {project.language && (
          <div className={styles.technologies}>
            {project.language.split(',').map((tech, index) => (
              <span
                key={index}
                className={styles.techTag}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onLanguageClick) {
                    onLanguageClick(tech.trim());
                  }
                }}
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        )}

        {/* {(project.stars !== undefined || project.forks !== undefined) && (
          <div className={styles.footer}>
            <div className={styles.stats}>
              {project.stars !== undefined && (
                <div className={styles.stat}>
                  <VscStarEmpty className={styles.icon} /> {project.stars}
                </div>
              )}
              {project.forks !== undefined && (
                <div className={styles.stat}>
                  <VscRepoForked className={styles.icon} /> {project.forks}
                </div>
              )}
            </div>
          </div>
        )} */}
      </div>
    </CardWrapper>
  );
};

export default ProjectCard;
