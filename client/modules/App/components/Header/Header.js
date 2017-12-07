import React, { PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Import Style
// import styles from './Header.css';
import './Header.css';

export function Header(props) {
  // const languageNodes = props.intl.enabledLanguages.map(
  //   lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  // );

  // return (
  //   <div className={styles.header}>
  //     <div className={styles.content}>
  //       <h1 className={styles['site-title']}>
  //         <Link to="/" >intlSiteTitle</Link>
  //       </h1>
  //       {
  //         context.router.isActive('/', true)
  //           ? <a className={styles['add-post-button']} href="#" onClick={props.onClickAlert}>intlClick</a>
  //           : null
  //       }
  //     </div>
  //   </div>
  // );
  // console.log(styles)
  return (
    <div className='header'>
      <div className='content'>
        <h1 className='site-title'>
          <Link to="/" >intlSiteTitle</Link>
        </h1>
            <a className='add-post-button' href="#" onClick={props.onClickAlert}>intlClick</a>
            <Link to="/hello" >intlHelloLink</Link>

      </div>
    </div>
  );
}

// Header.contextTypes = {
//   router: React.PropTypes.object,
// };
//
// Header.propTypes = {
//   onClickAlert: PropTypes.func.isRequired,
// };

export default Header;
// export default withRouter(Header);
