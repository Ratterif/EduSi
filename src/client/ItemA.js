import './App.module.css';
import { NeobuttonBlue, NeobuttonGreen } from './Neobutton';

function ItemA(props) {
  console.log(props.inf);
  return (
    <div>
      <hr />
      {props.inf.answer}
      <div>
        by {props.inf.user.username}: {}
      </div>
      <div>
        <NeobuttonBlue>Reduce Quality</NeobuttonBlue>
        {props.inf.verification}
        <NeobuttonGreen>Add Quality</NeobuttonGreen>
      </div>
      <hr />
    </div>
  );
}

export default ItemA;
