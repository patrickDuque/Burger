import React from 'react';
import Logo from '../assets/images/burger-logo.png';

export default props => (
  <div id='Logo' style={{ height: props.height }}>
    <img src={Logo} alt='logo' />
  </div>
);
