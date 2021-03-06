import React from 'react'
import { render } from 'react-dom'
import { Navigation } from './react-components/Navigation'
import { Footer } from './react-components/Footer'

import { divClick } from './helpers'

// Load <Navigation /> into <nav id='navReactEntryPoint' />
render(
  <Navigation />,
  document.getElementById('navReactEntryPoint')
)

// Load <Footer /> into <nav id='footerReactEntryPoint' />
render(
  <Footer />,
  document.getElementById('footerReactEntryPoint')
)