import React, { Component } from 'react'
import FooterContent from './FooterChildComponents/FooterContent'

export class Footer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isFooterVisible: true
    }
    this.toggleFooter = this.toggleFooter.bind(this)
  }

  toggleFooter(e) {
    e || e.window.event
    const clickTarget = document.querySelector("#footerButton")

    clickTarget
    ?
    this.setState(prevState => ({
      isFooterVisible: !prevState.isFooterVisible
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
            !this.state.isFooterVisible
            ?
            "footer__button--isHidden"
            :
            "footer__button"
          }
        >
          Click here to see the footer
        </p>
        <FooterContent isFooterVisible={this.state.isFooterVisible} />
      </div>
    )
  }
}