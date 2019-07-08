import React from 'react';
import classes from '../App.module.css';
import deleteIcon from '../deleteIcon.png';
import formatNumber from '../utils/utility';
const ExpenseTable = props => {
  return (
    <div className={props.type === 'inc' ? classes.income : classes.expenses}>
      <h2
        className={
          props.type === 'inc' ? classes.icome__title : classes.expenses__title
        }
      >
        {props.type === 'inc' ? 'Income' : 'Expense'}
      </h2>
      <div
        className={
          props.type === 'inc' ? classes.income__list : classes.expenses__list
        }
      />
      {props.items.map(item => {
        if (item.type === props.type) {
          return (
            <div className={classes.item__clearfix} id={item.id} key={item.id}>
              <div className={classes.item__description}>
                {item.description}
              </div>
              <div className={classes.right__clearfix}>
                <div className={classes.item__value}>
                  {formatNumber(+item.value, item.type)}
                </div>
                {item.type === 'exp' && (
                  <div className={classes.item__percentage}>
                    {Math.round((item.value / props.totalIncome) * 100) ===
                    Infinity
                      ? 100 + '%'
                      : Math.round((item.value / props.totalIncome) * 100) +
                        '%'}
                  </div>
                )}
                <div className={classes.item__delete}>
                  <button
                    className={classes.item__delete__btn}
                    onClick={() => {
                      props.onDeleteItem(item.id);
                    }}
                  >
                    <img
                      className={classes.deleteIcon}
                      src={deleteIcon}
                      alt=''
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ExpenseTable;
