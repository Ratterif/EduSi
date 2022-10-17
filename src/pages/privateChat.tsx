import classes from '../client/App.module.css';
import Auth from '../client/Auth';
import Link from 'next/link';
import Layout from '../client/layout';

export default function PrivChat() {
  return (
    <Layout>
      <div className={classes.App}>
        <h1>Private questions</h1>
        <Link href={'/'}>Home</Link>
      </div>
    </Layout>
  );
}
