import React from 'react';
import classes from './App.module.css';

import DisplayDate from './components/DisplayDate';
import Balance from './components/Balance';
import SummaryBar from './components/SummaryBar';
import Form from './components/Form';
import DisplayTable from './components/DisplayTable';

const updateObject = (oldObj, updatedVals) => {
  return {
    ...oldObj,
    ...updatedVals,
  };
};

class App extends React.Component {
  state = {
    balance: 0,
    expensePercentage: 0,
    totalIncome: 0,
    totalExpense: 0,
    month: null,
    allItems: [],
  };

  componentDidMount() {
    this.getDate();
  }

  getDate() {
    const now = new Date();
    const monthIndex = now.getMonth();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const month = months[monthIndex];
    this.setState({ month });
  }
  
  recalulateOnChange(allItems, prevState) {
    const totalExpense = allItems
      .filter(({ type }) => type === 'exp')
      .reduce((acc, item) => {
        return (acc += +item.value);
      }, 0);
    const totalIncome = allItems
      .filter(({ type }) => type === 'inc')
      .reduce((acc, item) => {
        return (acc += +item.value + 0);
      }, 0);
    const balance = totalIncome - totalExpense;
    let expensePercentage = 0;
    if (prevState.totalIncome > 0) {
      expensePercentage = Math.round((totalExpense / totalIncome) * 100);

      if (typeof expensePercentage !== 'number' || isNaN(expensePercentage)) {
        expensePercentage = 0;
      }
    }
    return {
      totalExpense,
      totalIncome,
      balance,
      expensePercentage,
      allItems,
    };
  }
  onSubmitAmount(description, value, type) {
    const obj = {
      id: new Date().valueOf(),
      description,
      value,
      type,
    };
    this.setState(prevState => {
      const allItems = [...prevState.allItems, obj];
      const newState = this.recalulateOnChange(allItems, prevState);
      return updateObject(prevState, newState);
    });
  }
  onDeleteItem(id) {
    this.setState(prevState => {
      const allItems = prevState.allItems.filter(item => id !== item.id);
      const newState = this.recalulateOnChange(allItems, prevState);
      return updateObject(prevState, newState);
    });
  }
  render() {
    // const allIncome = this.state.allItems.filter(item=>item.type==="inc")
    // const allExpenses = this.state.allItems.filter(item=>item.type==="inc")
    return (
      <div>
        <div className={classes.top}>
          <div className={classes.budget}>
            <DisplayDate
              month={this.state.month}
              year={new Date().getFullYear()}
            />
            <Balance amount={this.state.balance} />
            <SummaryBar
              type='inc'
              amount={this.state.totalIncome}
            />
            <SummaryBar
              type='exp'
              amount={this.state.totalExpense}
              percentage={this.state.expensePercentage}
            />
          </div>
        </div>
        <div className={classes.bottom}>
          <Form onSubmitAmount={this.onSubmitAmount.bind(this)} />
          <DisplayTable
            allItems={this.state.allItems}
            totalIncome={this.state.totalIncome}
            totalExpense={this.state.totalExpense}
            onDeleteItem={id => this.onDeleteItem(id)}
          />
        </div>
      </div>
    );
  }
}

export default App;
