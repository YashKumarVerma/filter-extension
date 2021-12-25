import React from 'react';
import logo from '../../assets/images/unacademy-logo.svg';

import './Newtab.css';
import './Newtab.scss';

const NewTabContainer = () => {
  return (
    <div className="new-tab-container">
      <header className="new-tab-header">
        <img src={logo} className="new-tab-logo" alt="Unacademy Secure Browsing" />
      </header>
    </div>
  );
};

export default NewTabContainer;
