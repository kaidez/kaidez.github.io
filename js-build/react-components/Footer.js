import React, { Component } from 'react'
import FooterContent from './FooterChildComponents/FooterContent'

export class Footer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isFooterVisible: false
    }
    this.toggleFooter = this.toggleFooter.bind(this)
  }

  toggleFooter(e) {
    e || e.window.event
    const clickTarget = document.querySelector("#footer__button")

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
          id="footer__button"
          onClick={this.toggleFooter}
        >
          Click here to see the footer
        </p>
        {
            this.state.isFooterVisible
            ?
            null
            :
            <FooterContent />
        }
      </div>
    )
  }
}