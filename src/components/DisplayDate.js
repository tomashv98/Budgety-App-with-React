import React from 'react';
import classes from '../App.module.css';



const DisplayDate = (props)=> (
  <div className={classes.budget__title}>
  Available Budget in 
  <span className={classes.budget__title__month}> {props.month} of {props.year}</span>:
</div>
)

export default DisplayDate