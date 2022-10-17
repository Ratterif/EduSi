import classes from '../../client/App.module.css';
import Auth from '../../client/Auth';
import Link from 'next/link';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Layout from '../../client/layout';
import ListA from '../../client/ListA';
import { NeobuttonBlue } from '../../client/Neobutton';

type TItemsProps = {
  id: number;
};
type PostRow = {
  id: number;
  question: string;
  description: string;
  profile: string;
  userId: number;
};
type AnswerRow = {
  id: number;
  answer: string;
  verification: number;
  questionId: number;
  userId: number;
};

export default (props: TItemsProps) => {
  const [post, setPost] = useState<PostRow | undefined>(undefined);
  const [answ, setAnsw] = useState<[AnswerRow] | undefined>(undefined);
  const [answText, setAnswText] = useState<string>('');
  async function getQuest(id: number) {
    const dt = await axios.post('http://localhost:3000/api/getQuest', {
      id,
    });
    setPost(dt.data);
  }
  async function addAnswer(answer: string, id: number) {
    const dt = await axios.post('http://localhost:3000/api/addAnswer', {
      answer,
      id,
    });
    getAnswers(id);
  }
  async function getAnswers(id: number) {
    const dt = await axios.post('http://localhost:3000/api/getAnswers', {
      id,
    });
    setAnsw(dt.data);
  }
  useEffect(() => {
    getQuest(props.id);
    getAnswers(props.id);
  }, []);

  return (
    <Layout>
      <div className={classes.App}>
        <Link href={'/'}>Home</Link>
        {post ? (
          <>
            <h1>{post.question}</h1>
            <div>{post.description}</div>
          </>
        ) : null}
        <div>
          <input
            type="text"
            value={answText}
            placeholder="Answer"
            onChange={(event) => setAnswText(event.target.value)}
          />
          <NeobuttonBlue onClick={() => addAnswer(answText, props.id)}>
            Add Answer
          </NeobuttonBlue>
        </div>
        {answ ? <ListA data={answ} /> : null}
      </div>
    </Layout>
  );
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const id = ctx.query.id;
  return {
    props: { id },
  };
};
