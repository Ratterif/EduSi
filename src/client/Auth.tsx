import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import Signin from './Signin';
import Signup from './Signup';
import { NeobuttonBlue, NeobuttonGreen } from './Neobutton';
import axios from 'axios';
import classes from './Auth.module.css';

const Auth = () => {
  const [username, setUsername] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [prof, setProf] = useState<string>('IT');
  const [profiled, setProfiled] = useState<string | undefined>(undefined);
  const [modal, setModal] = useState<boolean>(true);
  const [reg, setReg] = useState<boolean>(false);
  const reging = (frame: boolean) => {
    if (frame) {
      setModal(false);
      setReg(true);
    }
    if (!frame) {
      setModal(true);
      setReg(false);
    }
  };
  async function logout() {
    const dt = await axios.get('http://localhost:3000/api/logout');
    setProfiled(undefined);
    setModal(true);
  }
  async function getProfile() {
    const dt = await axios.get('http://localhost:3000/api/prof');
    console.log('getProfile', dt.data, dt.data?.username);
    return dt.data?.username;
  }
  async function getPro() {
    setProfiled(await getProfile());
  }
  useEffect(() => {
    getPro();
  }, []);
  async function passreq(username: string, pass: string) {
    const dt = await axios.post('http://localhost:3000/api/passreq', {
      username,
      pass,
    });
    const result = dt.data;
    setProf(result.prof);
    setProfiled(await getProfile());
    if (result) setModal(false);
  }
  async function passreg(username: string, pass: string, prof: string) {
    const dt = await axios.post('http://localhost:3000/api/passreg', {
      username,
      pass,
      prof,
    });
    const result = dt.data;
    setProfiled(await getProfile());
    if (result) setReg(false);
  }

  return (
    <div>
      {!profiled ? (
        <Modal>
          <div className={classes.logreg}>
            <NeobuttonGreen onClick={() => reging(false)}>Login</NeobuttonGreen>
            <NeobuttonGreen onClick={() => reging(true)}>
              Registration
            </NeobuttonGreen>
          </div>
          {modal ? (
            <Signin
              username={username}
              setUsername={setUsername}
              pass={pass}
              setPass={setPass}
              passreq={passreq}
            />
          ) : null}
          {reg ? (
            <Signup
              username={username}
              setUsername={setUsername}
              pass={pass}
              setPass={setPass}
              prof={prof}
              setProf={setProf}
              passreg={passreg}
            />
          ) : null}
        </Modal>
      ) : (
        <NeobuttonBlue onClick={() => logout()}>Log Out</NeobuttonBlue>
      )}
    </div>
  );
};

export default Auth;
