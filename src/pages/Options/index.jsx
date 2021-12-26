import React from 'react';
import { render } from 'react-dom';

/** load all screens */
import LandingPage from './screens/landing';


/**
 * bootstrap application and render landing screen in options (settings) page
 */
render(
  <LandingPage title={'Unacademy Secure Web'} />,
  window.document.querySelector('#app')
);

if (module.hot) module.hot.accept();
