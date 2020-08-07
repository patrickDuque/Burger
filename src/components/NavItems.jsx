import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const mapStateToProps = state => {
  return {
    user : state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout : () => dispatch(actions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(props => {
  return (
    <ul id='NavItems'>
      <li className='NavItem'>
        <NavLink to='/' exact>
          Burger Builder
        </NavLink>
      </li>
      {/* {/* <li className='NavItem'>
        <NavLink to='/checkout'>Checkout</NavLink>
      </li> */}
      {props.user ? (
        <li className='NavItem'>
          <NavLink to='/signin' onClick={props.onLogout}>
            Logout
          </NavLink>
        </li>
      ) : (
        <li className='NavItem'>
          <NavLink to='/signin'>LogIn/Register</NavLink>
        </li>
      )}
    </ul>
  );
});
