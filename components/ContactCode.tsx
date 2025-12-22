import styles from '@/styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'website',
    link: 'anggijuhniawan.vercel.app',
    href: 'https://anggijuhniawan.vercel.app',
  },
  {
    social: 'email',
    link: 'anggijuhniawan@gmail.com',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=anggijuhniawan@gmail.com&su=Tertarik%20untuk%20Berdiskusi%20Lebih%20Lanjut&body=Halo%20Anggi,%0D%0A%0D%0APerkenalkan,%20saya%20dari%20........................................%0D%0A%0D%0ASaya%20telah%20melihat%20portfolio%20Anda%20dan%20sangat%20tertarik%20dengan%20karya%20serta%20pengalaman%20yang%20Anda%20tampilkan.%0D%0A%0D%0ASaya%20ingin%20berdiskusi%20lebih%20lanjut%20mengenai%20potensi%20kerja%20sama%20atau%20peluang%20yang%20mungkin%20bisa%20kita%20bahas%20bersama.%0D%0A%0D%0ATerima%20kasih%20atas%20waktu%20dan%20perhatiannya.',
  },
  {
    social: 'github',
    link: 'ajuhniawan1',
    href: 'https://github.com/ajuhniawan1',
  },
  {
    social: 'linkedin',
    link: 'anggi-juhniawan-077993158',
    href: 'https://www.linkedin.com/in/anggi-juhniawan-077993158/',
  },
  {
    social: 'youtube',
    link: 'Anggi Juhniawan',
    href: 'https://www.youtube.com/@anggijuhniawan',
  },
  {
    social: 'instagram',
    link: 'ajuhniawan1',
    href: 'https://www.instagram.com/ajuhniawan1/',
  }
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
