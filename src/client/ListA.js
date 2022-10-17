import React from 'react';
import ItemA from './ItemA';
import classes from './App.module.css';

const ListA = (props) => {
  console.log('LIST', props.data);
  const list = props.data.map((obj) => <ItemA inf={obj} />);
  return <div className={classes.Blog}>{list}</div>;
};

export default ListA;
