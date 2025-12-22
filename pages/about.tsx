import styles from '@/styles/AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Anggi Juhniawan</h1>
        <div className={styles.subtitle}>Software Engineer</div>

        <div className={styles.aboutContent}>
          <section className={styles.section}>
            <p className={styles.paragraph}>
              Hello! I&apos;m Anggi, a software engineer based in Tapos, Depok who enjoys building things that live on the internet. I develop exceptional websites, web apps and mobile apps.
            </p>
            <p className={styles.paragraph}>
              I&apos;m focus on frontend development using React and Tailwind CSS, while also working with Golang and MySQL to build reliable and scalable backend systems for my projects.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Skills & Technologies</h2>
            <p className={styles.paragraph}>
              Here are a few technologies I&apos;ve been working with recently:
            </p>
            <div className={styles.skillsGrid}>
              <div className={styles.skillColumn}>
                <div className={styles.skillItem}>Golang</div>
                <div className={styles.skillItem}>Laravel</div>
                <div className={styles.skillItem}>MySQL</div>
                <div className={styles.skillItem}>Node.js</div>
                <div className={styles.skillItem}>Docker</div>
              </div>
              <div className={styles.skillColumn}>
                <div className={styles.skillItem}>React</div>
                <div className={styles.skillItem}>TailwindCSS</div>
                <div className={styles.skillItem}>JavaScript (ES6+)</div>
                <div className={styles.skillItem}>Firebase</div>
                <div className={styles.skillItem}>Java</div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className={styles.educationList}>
              <div className={styles.educationItem}>
                <div className={styles.educationHeader}>
                  <div>
                    <h3 className={styles.educationDegree}>
                      S1 Informatika
                    </h3>
                    <p className={styles.educationSchool}>
                      Universitas Indraprasta PGRI
                    </p>
                  </div>
                  <div className={styles.educationPeriod}>2018 - 2022</div>
                </div>
                <p className={styles.educationGrade}>IPK: 3.57</p>
              </div>

              <div className={styles.educationItem}>
                <div className={styles.educationHeader}>
                  <div>
                    <h3 className={styles.educationDegree}>
                      SMK Software Engineering
                    </h3>
                    <p className={styles.educationSchool}>SMKN 1 Depok</p>
                  </div>
                  <div className={styles.educationPeriod}>2013 - 2016</div>
                </div>
                <p className={styles.educationGrade}>Nilai: 86</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}

export default AboutPage;
