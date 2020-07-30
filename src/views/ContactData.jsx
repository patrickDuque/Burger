// Dependencies
import React, { Component } from 'react';
import axios from '../axios';
import { connect } from 'react-redux';

// Constants
import * as actionTypes from '../store/actions';

// Components
import CustomButton from '../components/UI/CustomButton';
import Spinner from '../components/UI/Spinner';
import CustomInput from '../components/UI/CustomInput';

const mapStateToProps = state => {
  return {
    ingredients : state.ingredients,
    price       : state.ingredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onResetIngredients : () => dispatch({ type: actionTypes.RESET_INGREDIENTS })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends Component {
    state = {
      orderForm : {
        name        : '',
        street      : '',
        town        : '',
        city        : '',
        phoneNumber : ''
      },
      loading   : false
    };

    submitOrderHandler = e => {
      e.preventDefault();
      this.setState({ loading: true });
      const time = new Date();
      const data = {
        ingredients : this.props.ingredients,
        price       : this.props.price,
        customer    : {
          name        : this.state.orderForm.name,
          address     : {
            street : this.state.orderForm.street,
            town   : this.state.orderForm.town,
            city   : this.state.orderForm.city
          },
          phoneNumber : this.state.orderForm.phoneNumber
        },
        timeOrdered : `${time.getHours()}:${time.getMinutes()}`
      };
      axios
        .post('/orders.json', data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      this.props.onResetIngredients();
      this.props.history.push('/');
    };

    onChangeOrderHandler = e => {
      this.setState({ orderForm: { ...this.state.orderForm, [e.target.id]: e.target.value } });
    };

    render() {
      let data = <Spinner />;
      if (!this.state.loading) {
        data = (
          <form onSubmit={this.submitOrderHandler}>
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.name}
              type='text'
              name='name'
              label='Name'
              id='name'
            />
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.street}
              type='text'
              name='street'
              label='Street'
              id='street'
            />
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.town}
              type='text'
              name='town'
              label='Town'
              id='town'
            />
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.city}
              type='text'
              name='city'
              label='City'
              id='city'
            />
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.phoneNumber}
              type='number'
              name='phoneNumber'
              label='Contact Number'
              id='phoneNumber'
            />
            <CustomButton type='Success'>ORDER</CustomButton>
          </form>
        );
      }
      return (
        <div id='ContactData'>
          <h4>Enter your contact details</h4>
          {data}
        </div>
      );
    }
  }
);
