//# sourceURL=Navigation.js
import React, { useState } from 'react';
import Menu from './NavigationChildComponents/Menu';

const Navigation = () => {
  const [isMenuVisible, showMenu] = useState(false);

  return (
    <>
      <h2 className='header--hidden-text'>Main Navigation</h2>
      <div
        id='menuButton'
        onClick={() => showMenu(!isMenuVisible)}
        className={
          isMenuVisible
            ? 'header__menu header__menu--isVisible'
            : 'header__menu'
        }
      >
        <span className='header--menu-line'></span>
        <span className='header--menu-line'></span>
        <span className='header--menu-line'></span>
      </div>
      <Menu isMenuVisible={isMenuVisible} />
    </>
  );
};

export default Navigation;
