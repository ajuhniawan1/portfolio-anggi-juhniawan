import React, { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { projects as localProjects } from '@/data/projects';
import { fetchProjectsFromGitHub } from '@/lib/githubService';
import { Project } from '@/types';

import styles from '@/styles/ProjectsPage.module.css';

const ITEMS_PER_PAGE = 6;

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>(localProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      const githubProjects = await fetchProjectsFromGitHub();
      
      // Prioritas GitHub dulu, fallback ke local kalau error
      if (githubProjects.length > 0) {
        setProjects(githubProjects);
        console.log(`✅ Loaded ${githubProjects.length} projects from GitHub`);
      } else {
        setProjects(localProjects);
        console.log(`⚠️ Using local data (${localProjects.length} projects)`);
      }
    };

    loadProjects();
  }, []);

  // Filter projects by selected language
  const filteredProjects = selectedLanguage
    ? projects.filter((project) =>
        project.language
          ?.split(',')
          .map((tech) => tech.trim())
          .includes(selectedLanguage)
      )
    : projects;

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handleLanguageFilter = (language: string) => {
    setSelectedLanguage(language);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilter = () => {
    setSelectedLanguage(null);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    // Previous button
    pages.push(
      <button
        key="prev"
        className={`${styles.pageButton} ${styles.navButton}`}
        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
    );

    // Always show first page
    pages.push(
      <button
        key={1}
        className={`${styles.pageButton} ${currentPage === 1 ? styles.active : ''}`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </button>
    );

    // Show ellipsis or pages 2-3
    if (showEllipsisStart) {
      pages.push(
        <span key="ellipsis-start" className={styles.ellipsis}>
          ...
        </span>
      );
    }

    // Show middle pages
    const startPage = showEllipsisStart ? Math.max(2, currentPage - 1) : 2;
    const endPage = showEllipsisEnd
      ? Math.min(totalPages - 1, currentPage + 1)
      : totalPages - 1;

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageButton} ${currentPage === i ? styles.active : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis before last page
    if (showEllipsisEnd) {
      pages.push(
        <span key="ellipsis-end" className={styles.ellipsis}>
          ...
        </span>
      );
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className={`${styles.pageButton} ${currentPage === totalPages ? styles.active : ''}`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        className={`${styles.pageButton} ${styles.navButton}`}
        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    );

    return pages;
  };

  return (
    <div className={styles.layout}>
      <h1 className={styles.pageTitle}>My Projects</h1>
      <p className={styles.pageSubtitle}>
        Here&apos;s a collection of my recent work. These projects showcase my
        skills in web development, design, and problem-solving.
      </p>

      {selectedLanguage && (
        <div className={styles.filterInfo}>
          <span>
            Filtered by: <strong>{selectedLanguage}</strong>
          </span>
          <button onClick={clearFilter} className={styles.clearFilter}>
            Clear Filter
          </button>
        </div>
      )}

      <div className={styles.container}>
        {currentProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} onLanguageClick={handleLanguageFilter} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>{renderPagination()}</div>
      )}
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Projects' },
  };
}

export default ProjectsPage;
