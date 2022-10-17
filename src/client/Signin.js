import React from 'react';
import { NeobuttonGreen } from './Neobutton';

const Signin = (props) => {
  return (
    <div>
      <input
        type="text"
        value={props.username}
        placeholder="Username"
        onChange={(event) => props.setUsername(event.target.value)}
      />
      Enter the password
      <input
        type="password"
        value={props.pass}
        placeholder="Password"
        onChange={(event) => props.setPass(event.target.value)}
      />
      <NeobuttonGreen onClick={() => props.passreq(props.username, props.pass)}>
        Login
      </NeobuttonGreen>
    </div>
  );
};

export default Signin;
