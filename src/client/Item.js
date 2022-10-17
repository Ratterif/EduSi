import './App.module.css';
import Link from 'next/link';

function Item(props) {
  console.log(props.inf);
  return (
    <div>
      {props.inf.question}
      <Link href={`/posts/${props.inf.id}`}>See that</Link>
    </div>
  );
}

export default Item;
