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
    allIncome: [],
    allExpenses: [],

   
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
  formatNumber(num, type = null) {
    let numSplit, int, dec, sign;
    num = Math.abs(num);

    num = num.toFixed(2);
    numSplit = num.split('.');

    int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }
    dec = numSplit[1];

    if (type === 'exp') {
      sign = '-';
      return sign + ' ' + int + '.' + dec;
    } else if (type === 'inc') {
      sign = '+';
      return sign + ' ' + int + '.' + dec;
    }
    return ' ' + int + '.' + dec;
  }
  onSubmitAmount(description, value, type) {
    const obj = {
      id: new Date().valueOf(),
      description,
      value,
    };
    console.log(obj);
    if (type === 'inc') {
      this.setState(prevState => {
        const allIncome = [...prevState.allIncome, obj];
        const totalIncome = prevState.totalIncome + obj.value;
        const balance = totalIncome - prevState.totalExpense;
        const expensePercentage =
          Math.round(prevState.totalExpense / totalIncome) * 100;
        const newState = {
          allIncome,
          totalIncome,
          balance,
          expensePercentage,
        };
        console.log('Income added');
        return updateObject(prevState, newState);
      });
      // await this.setState({ allIncome: newIncomeArray });
    } else if (type === 'exp') {
      console.log('Expense added');
      this.setState(prevState => {
        const totalExpense = prevState.totalExpense + obj.value;
        const balance = prevState.totalIncome - totalExpense;
        let expensePercentage = 100;
        if (prevState.totalIncome > 0) {
          expensePercentage =
            Math.round(totalExpense / prevState.totalIncome) * 100;
          obj.percentage = Math.round(obj.value / prevState.totalIncome);
        }
        obj.percentage = 100;
        const allExpenses = [...prevState.allExpenses, obj];
        const newState = {
          allExpenses,
          totalExpense,
          balance,
          expensePercentage,
        };
        return updateObject(prevState, newState);
      });
    }
  }
  onDeleteItem(id) {
this.setState(prevState=>{
  const allItems = prevState.allIncome.concat(prevState.allExpenses)
   

})

  }
  render() {
    return (
      <div>
        <div className={classes.top}>
          <div className={classes.budget}>
            <DisplayDate
              month={this.state.month}
              year={new Date().getFullYear()}
            />
            <Balance amount={this.formatNumber(this.state.balance)} />
            <SummaryBar
              type='inc'
              amount={this.formatNumber(this.state.totalIncome, 'inc')}
            />
            <SummaryBar
              type='exp'
              amount={this.formatNumber(this.state.totalExpense, 'exp')}
              percentage={this.formatNumber(this.state.expensePercentage)}
            />
          </div>
        </div>
        <div className={classes.bottom}>
          <Form onSubmitAmount={this.onSubmitAmount.bind(this)} />
          <DisplayTable
            allIncome={this.state.allIncome}
            allExpenses={this.state.allExpenses}
          />
        </div>
      </div>
    );
  }
}

export default App;

function calculateExpensePercentage(balance, expense) {}
