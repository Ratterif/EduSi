import classes from '../client/App.module.css';
import Auth from '../client/Auth';
import List from '../client/List';
import Link from 'next/link';
import React, { useState } from 'react';
import { NeobuttonBlue } from '../client/Neobutton';
import axios from 'axios';
import Layout from '../client/layout';

type PostRow = {
  id: number;
  question: string;
  description: string;
  profile: string;
  userId: number;
};

export default function Questions() {
  const [question, setQuestion] = useState<string>('');
  const [des, setDes] = useState<string>('');
  const [prof, setProf] = useState<string>('IT');
  const [theme, setTheme] = useState<string>('IT');
  const [posts, setPosts] = useState<PostRow[]>([]);

  async function ask(question: string, descr: string, prof: string) {
    const dt = await axios.post('http://localhost:3000/api/ask', {
      question,
      descr,
      prof,
    });
    if (dt.data) {
      setQuestion('');
      setDes('');
    }
  }
  async function searchQuest(theme: string) {
    const dt = await axios.post('http://localhost:3000/api/searchQuest', {
      theme,
    });
    console.log('QUST', dt.data);
    setPosts(dt.data);
  }

  return (
    <Layout>
      <div className={classes.App}>
        <Link href={'/'}>Home</Link>
        <h1>Ask Question</h1>
        <div>
          <input
            type="text"
            value={question}
            placeholder="Question"
            onChange={(event) => setQuestion(event.target.value)}
          />
          <textarea
            placeholder="Description"
            onChange={(event) => setDes(event.target.value)}
            value={des}
          />
          <select onChange={(event) => setProf(event.target.value)}>
            <option value={'IT'}>IT</option>
            <option value={'Phis-Math'}>Phis-Math</option>
            <option value={'Design'}>Design</option>
          </select>
          <NeobuttonBlue onClick={() => ask(question, des, prof)}>
            Ask
          </NeobuttonBlue>
        </div>
        <div>
          <h1>Questions</h1>
          Choose theme.
          <select onChange={(event) => setTheme(event.target.value)}>
            <option value={'IT'}>IT</option>
            <option value={'Phis-Math'}>Phis-Math</option>
            <option value={'Design'}>Design</option>
          </select>
          <NeobuttonBlue onClick={() => searchQuest(theme)}>
            Search
          </NeobuttonBlue>
        </div>
        <List data={posts} />
      </div>
    </Layout>
  );
}
