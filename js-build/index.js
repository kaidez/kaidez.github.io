import React from 'react'
import { render } from 'react-dom'

import { divClick } from "./helpers"
import { Navigation } from "./components/Navigation"

// Load <Navigation /> into <nav id="navReactEntryPoint" />
render(
  <Navigation />,
  document.getElementById('navReactEntryPoint')
)