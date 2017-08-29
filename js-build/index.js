import React from 'react'
import { render } from 'react-dom'

import { divClick } from "./helpers"
import { Navigation } from "./components/Navigation"

// Run divClick code
divClick

// Load the Nav
render(
  <Navigation />,
  document.getElementById('navReactEntryPoint')
)