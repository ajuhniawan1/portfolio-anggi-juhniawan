import { Project } from '@/types';

const GITHUB_RAW_URL = process.env.NEXT_PUBLIC_GITHUB_RAW_URL || 
  'https://raw.githubusercontent.com/ajuhniawan1/portfolio-assents/main';

export async function fetchProjectsFromGitHub(): Promise<Project[]> {
  try {
    const response = await fetch(`${GITHUB_RAW_URL}/portfolio.json`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.warn(`GitHub fetch failed: ${response.statusText}`);
      return [];
    }

    const text = await response.text();
    
    // Parse JSON with error handling
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('Invalid JSON in portfolio.json:', parseError);
      console.error('JSON content:', text.substring(0, 200));
      return [];
    }

    if (!Array.isArray(data)) {
      console.error('portfolio.json must be an array');
      return [];
    }
    
    // Fix image paths to use GitHub raw URLs
    const fixedData = data.map((project: Project) => ({
      ...project,
      image: project.image?.startsWith('/img/') 
        ? `${GITHUB_RAW_URL}${project.image}`
        : project.image,
      gallery: project.gallery?.map((img: string) => 
        img.startsWith('/img/') ? `${GITHUB_RAW_URL}${img}` : img
      ),
    }));
    
    return fixedData;
  } catch (error) {
    console.error('Error fetching projects from GitHub:', error);
    return [];
  }
}
