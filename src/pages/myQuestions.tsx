import { useEffect, useState } from 'react';
import axios from 'axios';
import List from '../client/List';
import Link from 'next/link';
import classes from '../client/App.module.css';
import Auth from '../client/Auth';
import Layout from '../client/layout';

type PostRow = {
  id: number;
  question: string;
  description: string;
  profile: string;
  userId: number;
};

export default () => {
  const [posts, setPosts] = useState<PostRow[]>([]);

  async function getMyQuests() {
    const dt = await axios.get('http://localhost:3000/api/getMyQuests');
    setPosts(dt.data);
  }

  useEffect(() => {
    getMyQuests();
  }, []);
  return (
    <Layout>
      <div className={classes.App}>
        <Link href={'/'}>Home</Link>
        <div>
          <List data={posts} />
        </div>
      </div>
    </Layout>
  );
};
