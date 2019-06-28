import React from 'react';
import classes from '../App.module.css';
import deleteIcon from '../deleteIcon.png';

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
      {props.items.map(item => (
        <div className={classes.item__clearfix} id={item.id} key={item.id}>
          <div className={classes.item__description}>{item.description}</div>
          <div className={classes.right__clearfix}>
            <div className={classes.item__value}>{item.value}</div>
            {props.type === 'exp' && (
              <div className={classes.item__percentage}>
                {item.percentage} %
              </div>
            )}
            <div className={classes.item__delete}>
              <button className={classes.item__delete__btn}>
                <img className={classes.deleteIcon} src={deleteIcon} alt='' />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseTable;

{
  /* <div class="item clearfix" id="exp-%id%">
      <div class="item__description">%description%</div>
      <div class="right clearfix">
        <div class="item__value">%value%</div>
        <div class="item__percentage">21%</div>
        <div class="item__delete">
          <button class="item__delete--btn">
            <i class="ion-ios-close-outline"></i>
          </button>
        </div>
      </div>
    </div> */
}
