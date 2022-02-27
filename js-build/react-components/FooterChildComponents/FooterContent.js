//# sourceURL=FooterContent.js
import React from 'react';
import FontAwesome from 'react-fontawesome';

const FooterContent = (props) => {
  const { isFooterHiddenOnMobile } = props;

  return (
    <div
      className={
        isFooterHiddenOnMobile
          ? 'footer__inner-wrapper--isHidden'
          : 'footer__inner-wrapper'
      }
    >
      <div className='footer__column footer__column--1'>
        <h2 className='footer__heading'>Categories</h2>
        <ul className='footer__category-nav'>
          <li className='footer--list-item'>
            <a href='/tutorials/' className='footer--page-link'>
              Tutorials
            </a>
          </li>
          <li className='footer--list-item'>
            <a href='/coding-best-practices/' className='footer--page-link'>
              Coding Tips
            </a>
          </li>
          <li className='footer--list-item'>
            <a href='/personal/' className='footer--page-link'>
              Personal
            </a>
          </li>
          <li className='footer--list-item'>
            <a href='/reviews/' className='footer--page-link'>
              Reviews
            </a>
          </li>
        </ul>
      </div>

      <div className='footer__column footer__column--2'>
        <img
          src='/img/footer-profile-pic.jpg'
          className='footer--profile-image'
        />
      </div>

      <div className='footer__column footer__column--3'>
        Kai "kaidez" Gittens is a front-end web developer for JPMorgan Chase. He
        has contributed to web experiences for Revlon, jetBlue, Everyday Health
        and the United Nations. He is a former JavaScript instructor for
        lynda.com and is a loyal supporter of Chelsea F.C.
        <div className='footer--social-network'>
          <a
            href='https://twitter.com/kaidez'
            className='footer--social-network-link'
          >
            <FontAwesome name='twitter' size='lg' />
          </a>
          <a
            href='https://www.facebook.com/kaidezblog/'
            className='footer--social-network-link'
          >
            <FontAwesome name='facebook' size='lg' />
          </a>
          <a
            href='https://github.com/kaidez'
            className='footer--social-network-link'
          >
            <FontAwesome name='github-alt' size='lg' />
          </a>
          <a
            href='https://www.youtube.com/kaidezblog'
            className='footer--social-network-link'
          >
            <FontAwesome name='youtube' size='lg' />
          </a>
        </div>
        <div className='footer__colophon'>
          <span className='footer__colophon--item'>
            &copy;2008-{new Date().getFullYear() % 100}
          </span>
          <span className='footer__colophon--item'>
            <a href='/sitemap/' className='footer--page-link'>
              Sitemap
            </a>
          </span>
          <span className='footer__colophon--item'>
            <a href='/affiliate-disclaimer/' className='footer--page-link'>
              Affiliate Disclaimer
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterContent;
