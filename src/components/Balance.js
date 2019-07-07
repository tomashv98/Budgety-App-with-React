import React from 'react';
import classes from '../App.module.css';

import formatNumber from "../utils/utility"

const Balance = props => {
  return <div className={classes.budget__value}>{formatNumber(props.amount)}</div>;
};

export default Balance;
