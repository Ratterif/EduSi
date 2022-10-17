import React from 'react';
import { NeobuttonGreen } from './Neobutton';

const Signup = (props) => {
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
      <select onChange={(event) => props.setProf(event.target.value)}>
        <option value={'IT'}>IT</option>
        <option value={'Phis-Math'}>Phis-Math</option>
        <option value={'Design'}>Design</option>
      </select>
      <NeobuttonGreen
        onClick={() => props.passreg(props.username, props.pass, props.prof)}
      >
        Registration
      </NeobuttonGreen>
    </div>
  );
};

export default Signup;
