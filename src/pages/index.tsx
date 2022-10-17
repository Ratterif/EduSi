import Link from 'next/link';
import { FC } from 'react';
import classes from '../client/App.module.css';
import Layout from '../client/layout';

const Home: FC = () => {
  return (
    <Layout>
      <div className={classes.App}>
        <h1>About platform</h1>
        <div>
          That's educational platform. Here you can ask questions and reply
          them, communicate without educational theme.
        </div>
      </div>
    </Layout>
  );
};

export default Home;
