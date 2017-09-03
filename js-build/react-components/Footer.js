import React, { Component } from 'react'

export class Footer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isToggleOn: true,
      isMenuVisible: false
    }
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
  }

  render() {
    return(
      <div className="footer__wrapper">

        <div className="footer__column footer__column--1">
          <h2 className="footer__heading">Categories</h2>
          <ul className="footer__category-nav">
            <li className="footer--list-item">
              <a href="/tutorials/" className="footer--page-link">Tutorials</a>
            </li>
            <li className="footer--list-item">
              <a href="/coding-best-practices/" className="footer--page-link">Coding Tips</a>
            </li>
            <li className="footer--list-item">
              <a href="/personal/" className="footer--page-link">Personal</a>
            </li>
            <li className="footer--list-item">
              <a href="/reviews/" className="footer--page-link">Reviews</a>
            </li>
          </ul>
        </div>

        <div className="footer__column footer__column--2">
          <img src="/img/footer-profile-pic.jpg" className="footer--profile-image" />
        </div>

        <div className="footer__column footer__column--3">
          Kai "kaidez" Gittens is a front-end web developer for JPMorgan Chase. He has contributed to web experiences for Revlon, jetBlue, Everyday Health and the United Nations. He is also a former JavaScript instructor for lynda.com and is a loyal supporter of Chelsea F.C.
        </div>

        <div className="footer__colophon">
          <span className="footer__colophon--item">&copy;2008-17</span>
          <span className="footer__colophon--item">
            <a href="/sitemap/" className="footer--page-link">Sitemap</a>
          </span>
          <span className="footer__colophon--item">
            <a href="/affiliate-disclaimer/" className="footer--page-link">Affiliate Disclaimer</a>
          </span>
        </div>
      </div>
    )
  }
}