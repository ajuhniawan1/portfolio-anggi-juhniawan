import React from 'react';
import styles from '@/styles/ExperiencesPage.module.css';

interface JobRole {
  title: string;
  description: string | string[];
}

interface Experience {
  id: string;
  title: string;
  company: string;
  companyHighlight?: string;
  period: string;
  description?: string | string[];
  roles?: JobRole[];
  technologies?: string[];
}

const experiences: Experience[] = [
  {
    id: '3',
    title: 'Programmer | Fullstack Developer',
    company: 'Cyber Smart Network Asia (CSNA)',
    period: 'September 2024 - Present',
    description:
      'Perusahaan yang bergerak sebagai penyedia layanan payment gateway dan EDC management, di mana bank melakukan pemesanan (order) perangkat EDC untuk mendukung layanan pembayaran nasabah merchant mereka. CSNA bertanggung jawab atas penyediaan, integrasi, pengelolaan transaksi, serta monitoring EDC, sehingga bank dapat memastikan proses pembayaran berjalan aman, stabil, dan efisien bagi para merchant mereka.',
    technologies: [],
  },
  {
    id: '4',
    title: 'Yayasan Berkat Anak',
    company: 'Yayasan Berkat Anak',
    period: 'May 2022 - July 2024',
    roles: [
      {
        title: 'Guru Informatika - SD, SMP, SMA (Sekolah Pelita Anugerah)',
        description: [
          'Membimbing Murid dalam melakukan pembuatan desain Canva, Game Sederhana, Robotic, Networking',
          'Mengajarkan aplikasi berbasis Desktop dan Android',
          'Mempelajari Microsoft Office',
        ],
      },
      {
        title: "Administrasi (TK Bless Kid's School)",
        description: [
          'Menyusun program Tenaga Administrasi Sekolah',
          'Mengelola Keuangan sekolah bersama kepala sekolah, bendahara dan wakil kepala sekolah',
          'Mengurus administrasi ketenagaan dan siswa',
          'Membuat Desain (Banner, Spanduk, ID Card, Dll) dan Editing video kegiatan anak-anak',
          'Menyusun Administrasi perlengkapan Sekolah',
        ],
      },
    ],
    technologies: [],
  },
  {
    id: '5',
    title: 'Freelance Developer',
    company: 'Keboen Coding',
    period: 'October 2016 - October 2018',
    description:
      'Freelance projects untuk berbagai klien, fokus pada web development dan automation.',
    technologies: [],
  },
];

const ExperiencesPage = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeExp = experiences[activeIndex];

  return (
    <div className={styles.layout}>
      <h1 className={styles.pageTitle}>Work Experience</h1>
      <p className={styles.pageSubtitle}>
        My professional journey in software development and technology.
      </p>

      <div className={styles.experienceCard}>
        <div className={styles.sidebar}>
          <div className={styles.companies}>
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`${styles.companyItem} ${
                  index === activeIndex ? styles.active : ''
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {exp.company}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>
            {activeExp.title}{' '}
            {activeExp.companyHighlight && (
              <>
                <span className={styles.at}>@</span>{' '}
                <span className={styles.company}>
                  {activeExp.companyHighlight}
                </span>
              </>
            )}
          </h2>
          <div className={styles.period}>{activeExp.period}</div>

          {activeExp.roles ? (
            <div className={styles.rolesWrapper}>
              {activeExp.roles.map((role, index) => (
                <div key={index} className={styles.roleItem}>
                  <h3 className={styles.roleTitle}>{role.title}</h3>
                  {Array.isArray(role.description) ? (
                    <div className={styles.bulletList}>
                      {role.description.map((item, idx) => (
                        <div key={idx} className={styles.descriptionWrapper}>
                          <span className={styles.bullet}>▹</span>
                          <p className={styles.description}>{item}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.descriptionWrapper}>
                      <span className={styles.bullet}>▹</span>
                      <p className={styles.description}>{role.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              {Array.isArray(activeExp.description) ? (
                <div className={styles.bulletList}>
                  {activeExp.description.map((item, idx) => (
                    <div key={idx} className={styles.descriptionWrapper}>
                      <span className={styles.bullet}>▹</span>
                      <p className={styles.description}>{item}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.descriptionWrapper}>
                  <span className={styles.bullet}>▹</span>
                  <p className={styles.description}>{activeExp.description}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Experiences' },
  };
}

export default ExperiencesPage;
