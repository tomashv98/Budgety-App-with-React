import React from 'react';
import classes from '../App.module.css';
import ExpenseTable from "./ExpenseTable"

const displayTable = props => {
  return (
    <div className={classes.container}>
      <ExpenseTable type="inc" items={props.allIncome}/>
      <ExpenseTable type="exp" items={props.allExpenses}/>
    </div>
  );
};

export default displayTable