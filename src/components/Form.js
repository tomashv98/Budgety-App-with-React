import React from 'react';
import classes from '../App.module.css';
import plusIcon from '../plustag.png';

const updateObject = (oldObj, updatedVals) => {
  return {
    ...oldObj,
    ...updatedVals,
  };
};

class Form extends React.Component {
  state = {
    form: {
      description: {
        value: '',
        valid: false,
        validation: {
          required: true,
          minLength: 2,
        },
      },
      value: {
        value: '',
        valid: false,
        validation: {
          required: true,
          isNumeric: true,
        },
      },
    },
    type: 'inc',
    validForm: false,
  };

  onInputChangeHandler(e, input) {
    const eventValue = e.target.value;
    this.setState(prevState => {
      const updatedForm = {
        ...prevState.form,
      };
      const updatedElement = {
        ...updatedForm[input],
      };
      updatedElement.value = eventValue;
      updatedElement.valid = this.checkValidity(
        updatedElement.value,
        updatedElement.validation,
      );
      updatedForm[input] = updatedElement;
      let formValid = true;
      for (let input in updatedForm) {
        formValid = updatedForm[input].valid && formValid;
      }
      return { form: updatedForm, validForm: formValid };
    });
  }
  onTypeChange(e) {
    this.setState({ type: e.target.value });
  }
  clearInput() {
    this.setState(prevState => {
      const description = updateObject(prevState.form.description, {
        value: '',
        valid: false,
      });
      const value = updateObject(prevState.form.value, {
        value: '',
        valid: false,
      });
      const form = (prevState.form, { value, description });
      return updateObject(prevState, { form, validForm: false });
    });
  }

  checkValidity = (value, rule) => {
    let isValid = true;
    if (!rule) {
      return true;
    }
    if (rule.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rule.minLength) {
      isValid = value.length >= rule.minLength && isValid;
    }
    if (rule.maxLength) {
      isValid = value.length <= rule.maxLength && isValid;
    }
    if (rule.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  render() {
    return (
      <div className={classes.add}>
        <form className={classes.add__container}>
          <select
            className={classes.add__type}
            value={this.state.type}
            onChange={e => this.onTypeChange(e)}
          >
            <option value='inc'>+</option>
            <option value='exp'>-</option>
          </select>
          <input
            onChange={e => this.onInputChangeHandler(e, 'description')}
            type='text'
            className={classes.add__description}
            placeholder='Add description'
            value={this.state.form.description.value}
          />
          <input
            onChange={e => this.onInputChangeHandler(e, 'value')}
            type='number'
            className={classes.add__value}
            placeholder='Value'
            value={this.state.form.value.value}
          />
          <button
          type="submit"
            disabled={!this.state.validForm}
            className={classes.add__btn}
            onClick={() => {
              this.props.onSubmitAmount(
                this.state.form.description.value,
                this.state.form.value.value,
                this.state.type,
              );
              this.clearInput();
            }}
          >
            <img className={classes.plusIcon} src={plusIcon} alt='' />
          </button>
        </form>
      </div>
    );
  }
}
export default Form;
