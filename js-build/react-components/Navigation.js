//# sourceURL=Navigation.js
import React, { Component, Fragment } from 'react'
import Menu from './NavigationChildComponents/Menu'

export class Navigation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isMenuVisible: false
    }
  }

  toggleMobileMenu(e) {
    e || e.window.event
    const clickTarget = document.querySelector("#menuButton")

    clickTarget
    ?
    this.setState(prevState => ({
      isMenuVisible: !prevState.isMenuVisible
    }))
    :
    null
  }

  render() {
    return(
      <Fragment>
        <h2 className="header--hidden-text">Main Navigation</h2>
        <div
          id="menuButton"
          onClick={this.toggleMobileMenu}
          className=
          {
            this.state.isMenuVisible
            ?
            "header__menu header__menu--isVisible"
            :
            "header__menu"
          }
        >
          <span className="header--menu-line"></span>
          <span className="header--menu-line"></span>
          <span className="header--menu-line"></span>
        </div>
        <Menu isMenuVisible={this.state.isMenuVisible} />
      </Fragment>
    )
  }
}