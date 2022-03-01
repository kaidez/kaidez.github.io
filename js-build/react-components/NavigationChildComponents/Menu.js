//# sourceURL=Menu.js
import React from 'react';

const Menu = (props) => {
  const { isMenuVisible } = props;

  return (
    <div
      className={
        isMenuVisible
          ? 'header__nav-wrapper header__nav-wrapper--isVisible'
          : 'header__nav-wrapper header__nav-wrapper--isHidden'
      }
    >
      <a className='header__nav--page-link' href='/blog'>
        blog
      </a>
      <a className='header__nav--page-link' href='/articles'>
        articles
      </a>
      <a className='header__nav--page-link' href='/lynda-kaidez'>
        kaidez on lynda.com
      </a>
      <a className='header__nav--page-link' href='/ajax-tutorial'>
        ajax tutorial
      </a>
    </div>
  );
};

export default Menu;
// class Menu extends Component {

//   static displayName = 'Menu'

//   render() {

//     const {isMenuVisible} = this.props

//     return(
//       <div
//         className={
//           isMenuVisible
//           ?
//           "header__nav-wrapper header__nav-wrapper--isVisible"
//           :
//           "header__nav-wrapper header__nav-wrapper--isHidden"
//         }
//       >
//         <a className="header__nav--page-link" href="/blog">blog</a>
//         <a className="header__nav--page-link" href="/articles">articles</a>
//         <a className="header__nav--page-link" href="/lynda-kaidez">kaidez on lynda.com</a>
//         <a className="header__nav--page-link" href="/ajax-tutorial">ajax tutorial</a>
//       </div>
//     )
//   }
// }
