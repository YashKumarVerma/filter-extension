import React from 'react';
import { render } from 'react-dom';

/**
 * import all pages defined in application
 */
import NewTabLandingScreen from './pages/landing';
import './index.css';

/**
 * render the landing page
 */
render(<NewTabLandingScreen />, window.document.querySelector('#app-container'));


if (module.hot) module.hot.accept();
