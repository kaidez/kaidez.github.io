//# sourceURL=index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './react-components/Navigation';
import Footer from './react-components/Footer';
import { divClick } from './helpers';

// Load <Navigation /> into <nav id='navReactEntryPoint' />
ReactDOM.render(<Navigation />, document.getElementById('navReactEntryPoint'));

// Load <Footer /> into <nav id='footerReactEntryPoint' />
ReactDOM.render(<Footer />, document.getElementById('footerReactEntryPoint'));
