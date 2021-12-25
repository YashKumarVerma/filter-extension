import React from 'react';
import { render } from 'react-dom';

/** load all screens */
import LandingPage from './screens/landing';


/**
 * bootstrap application and render landing screen in options (settings) page
 */
render(
  <LandingPage title={'Settings'} />,
  window.document.querySelector('#options-container')
);

if (module.hot) module.hot.accept();
