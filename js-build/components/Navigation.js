import React, { Component } from 'react'

export const Navigation = () => (
  <div>
    <h2 className="header--hidden-text">Main Navigation</h2>
    <div className="header__menu" tabIndex="0">
      <span className="header--menu-line"></span>
      <span className="header--menu-line"></span>
    </div>
    <div className="header__nav-wrapper">
      <a className="header__nav--page-link" href="/blog">blog</a>
      <a className="header__nav--page-link" href="/articles">articles</a>
      <a className="header__nav--page-link" href="/lynda-kaidez">kaidez on lynda.com</a>
      <a className="header__nav--page-link" href="/ajax-tutorial">ajax tutorial</a>
    </div>
  </div>
)