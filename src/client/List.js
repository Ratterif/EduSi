import React from 'react';
import Item from './Item';
import classes from './App.module.css';

const List = (props) => {
  console.log('LIST', props.data);
  const list = props.data.map((obj) => <Item inf={obj} />);
  return <div className={classes.Blog}>{list}</div>;
};

export default List;
