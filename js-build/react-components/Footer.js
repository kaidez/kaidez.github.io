import React, { Component } from 'react'
import FooterContent from './FooterChildComponents/FooterContent'

export class Footer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isFooterHiddenOnMobile: true
    }
    this.toggleFooter = this.toggleFooter.bind(this)
  }

  toggleFooter(e) {
    e || e.window.event
    const clickTarget = document.querySelector("#footerButton")

    clickTarget
    ?
    this.setState(prevState => ({
      isFooterHiddenOnMobile: !prevState.isFooterHiddenOnMobile
    }))
    :
    null
  }

  render() {
    return(
      <div className="footer__wrapper">
        <p
          id="footerButton"
          onClick={this.toggleFooter}
          className={
            !this.state.isFooterHiddenOnMobile
            ?
            "footer__button--isHidden"
            :
            "footer__button"
          }
        >
          Click here to see the footer
        </p>
        <FooterContent isFooterHiddenOnMobile={this.state.isFooterHiddenOnMobile} />
      </div>
    )
  }
}