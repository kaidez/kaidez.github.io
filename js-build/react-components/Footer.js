//# sourceURL=Footer.js
import React, { useState } from 'react';
import FooterContent from './FooterChildComponents/FooterContent';

const Footer = () => {
  const [isFooterHiddenOnMobile, hideFooter] = useState(true);

  return (
    <div
      className={
        !isFooterHiddenOnMobile
          ? 'footer__wrapper'
          : 'footer__wrapper footer--has-cursor'
      }
    >
      <p
        id='footerButton'
        onClick={() => hideFooter(!isFooterHiddenOnMobile)}
        className={
          !isFooterHiddenOnMobile
            ? 'footer__button--isHidden'
            : 'footer__button'
        }
      >
        Click here to see the footer
      </p>
      <FooterContent isFooterHiddenOnMobile={isFooterHiddenOnMobile} />
    </div>
  );
};

export default Footer;
