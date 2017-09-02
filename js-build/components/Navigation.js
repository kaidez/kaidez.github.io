import React, { Component } from 'react'
import Menu from './NavigationChildComponents/Menu'

export class Navigation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isToggleOn: true,
      isMenuVisible: false
    }
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
  }

  toggleMobileMenu(e) {
    e.preventDefault()
    e.stopPropagation()
    e || e.window.event
    const clickTarget = document.querySelector("#menuButton")

    clickTarget
    ?
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
      isMenuVisible: !prevState.isMenuVisible
    }))
    :
    null
  }

  render() {
    return(
      <div>
        <h2 className="header--hidden-text">Main Navigation</h2>
        <div id="menuButton" className="header__menu" onClick={this.toggleMobileMenu}>
          <span className="header--menu-line"></span>
          <span className="header--menu-line"></span>
        </div>
        {
          this.state.isMenuVisible
          ?
          <Menu />
          :
          null
        }
      </div>
    )
  }
}