import Link from 'next/link';
import Auth from './Auth';
import styles from './header.module.css';
import { Button } from '@mui/material';

export default function Header() {
  return (
    <header>
      <div className={styles.signedInStatus}>
        <Auth />
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/qa">
              <a>Questions Answers</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/privateChat">
              <a>Anthonim questions</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
