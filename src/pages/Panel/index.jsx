import React from 'react';
import { render } from 'react-dom';


/** import all application screens */
import LandingScreen from './screens/landing';

/** attach landing screen to html page */
render(<LandingScreen />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
