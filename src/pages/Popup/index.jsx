import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';

render(<Popup />, window.document.querySelector('#filter-extension-popup'));

if (module.hot) module.hot.accept();
