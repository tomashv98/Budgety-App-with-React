import React from 'react';
import classes from '../App.module.css';
import ExpenseTable from './ExpenseTable';

const displayTable = props => {
  return (
    <div className={classes.container}>
      <ExpenseTable
        type='inc'
        items={props.allItems}
        totalIncome={props.totalIncome}
        totalExpense={props.totalExpense}
        onDeleteItem={props.onDeleteItem}
      />
      <ExpenseTable
        type='exp'
        items={props.allItems}
        totalIncome={props.totalIncome}
        totalExpense={props.totalExpense}
        onDeleteItem={props.onDeleteItem}

      />
    </div>
  );
};

export default displayTable;
