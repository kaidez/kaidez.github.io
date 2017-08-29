import React from 'react'
import { render } from 'react-dom'

import { divClick } from "./helpers"
import { Navigation } from "./components/Navigation"

// Run divClick code
divClick

// Load <Navigation /> into <nav id="navReactEntryPoint" />
render(
  <Navigation />,
  document.getElementById('navReactEntryPoint')
)