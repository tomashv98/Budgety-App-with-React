import React from 'react';
import classes from '../App.module.css';
import Date from './DisplayDate';
import Balance from './Balance';

const Top = props => {
  return (
    <div className={classes.top}>
      <div className={classes.budget}>
        <Date month={props.month} year={props.year} />
        <Balance balance={props.balance} />
        <div className={classes.budget__income}>
          <div className={classes.budget__income__text}>Income</div>
          <div className={classes.right}>
            <div className={classes.budget__income__value}>+ 4,300.00</div>
            <div className={classes.budget__income__percentage}>&nbsp;</div>
          </div>
        </div>

        <div className={classes.budget__expenses}>
          <div className={classes.budget__expenses__text}>Expenses</div>
          <div className={classes.right__clearfix}>
            <div className={classes.budget__expenses__value}>- 1,954.36</div>
            <div className={classes.budget__expenses__percentage}>45%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
