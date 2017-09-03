import React from 'react'
import { render } from 'react-dom'
import { Navigation } from "./components/Navigation"

import { divClick } from "./helpers"

// Load <Navigation /> into <nav id="navReactEntryPoint" />
render(
  <Navigation />,
  document.getElementById('navReactEntryPoint')
)