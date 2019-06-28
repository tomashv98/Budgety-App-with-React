import React from 'react';
import classes from '../App.module.css';

const Balance = props => {
  return <div className={classes.budget__value}>{props.amount}</div>;
};

export default Balance;
