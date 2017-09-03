import React, { Component } from 'react'

class Menu extends Component {

  render() {

    const {isMenuVisible} = this.props

    return(
      <div
        className={
          isMenuVisible
          ?
          "header__nav-wrapper header__nav-wrapper--isVisible"
          :
          "header__nav-wrapper header__nav-wrapper--isHidden"
        }
      >
        <a className="header__nav--page-link" href="/blog">blog</a>
        <a className="header__nav--page-link" href="/articles">articles</a>
        <a className="header__nav--page-link" href="/lynda-kaidez">kaidez on lynda.com foo</a>
        <a className="header__nav--page-link" href="/ajax-tutorial">ajax tutorial</a>
      </div>
    )
  }
}

export default Menu