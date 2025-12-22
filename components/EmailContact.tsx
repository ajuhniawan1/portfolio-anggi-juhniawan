import styles from '@/styles/EmailContact.module.css';

const EmailContact = () => {
  return (
    <div className={styles.emailContact}>
      <a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=anggijuhniawan@gmail.com&su=Hello%20Anggi"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.emailLink}
      >
        anggijuhniawan@gmail.com
      </a>
      <div className={styles.verticalLine}></div>
    </div>
  );
};

export default EmailContact;
