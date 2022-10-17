import classes from '../client/App.module.css';
import Link from 'next/link';
import Auth from '../client/Auth';
import Layout from '../client/layout';

export default function Page() {
  return (
    <Layout>
      <div className={classes.App}>
        <ul className={classes.Blog}>
          <li>
            <Link href={'/questions'}>See questions</Link>
          </li>
          <li>
            <Link href={'/myQuestions'}>My questions</Link>
          </li>
          <li>
            <Link href={'/'}>My answers</Link>
          </li>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
