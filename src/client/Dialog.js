import React, {useState} from 'react';
import Neobutton from './Neobutton';

const Dialog = (props) => {
    const [na, setNa] = useState("")
  const [ag, setAg] = useState('');
  const [des, setDes] = useState('');

    return (
        <div>
            <button onClick={props.locker}>закрыть</button>
            <input type={"text"} value={na} placeholder="Имя" onChange={event => setNa(event.target.value)}/>
            <input type={"text"} value={ag} placeholder="Возраст" onChange={event => setAg(event.target.value)}/>
          <textarea placeholder="Описание" onChange={event => setDes(event.target.value)}>{des}</textarea>
            <button onClick={() => props.addperson(na, Number(ag), des)}>применить</button>
        </div>
  );
};

export default Dialog;
