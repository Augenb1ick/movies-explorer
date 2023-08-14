import { useState, useContext } from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import { useLocation, Link } from 'react-router-dom';
import NavTab from '../NavTab/NavTab';
import { CurrentUserContext } from '../../context/CurrentUserContext';

const Header = ({ isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);

  const location = useLocation();
  const chechLocation = (path) => {
    return location.pathname === path ? true : false;
  };

  const [navTabIsOpened, setNavTabIsOpened] = useState(false);

  const handleNavTabOpen = () => {
    setNavTabIsOpened(true);
  };

  const handleNavTabClose = () => {
    setNavTabIsOpened(false);
  };

  const landingHeaderContent = (
    <>
      <Link to='/'>
        <img className='header__logo_landing' src={logo} alt='лого' />
      </Link>
      <nav className='header__auth'>
        <Link to='/signup' className='header__auth-btn'>
          Регистрация
        </Link>
        <Link to='/signin' className='header__auth-btn'>
          Войти
        </Link>
      </nav>
    </>
  );

  const mainHeaderContent = (
    <>
      <Link to='/'>
        <img className='header__logo_main' src={logo} alt='лого' />
      </Link>
      <nav
        className={`header__nav ${chechLocation('/') && 'header__nav_main'}`}
      >
        <Link
          to='/movies'
          className={`header__nav-option ${
            chechLocation('/movies') ? 'header__nav-option_active' : ''
          }`}
        >
          Фильмы
        </Link>
        <Link
          to='/saved-movies'
          className={`header__nav-option ${
            chechLocation('/saved-movies') ? 'header__nav-option_active' : ''
          }`}
        >
          Сохранённые фильмы
        </Link>
      </nav>
      <div
        className={`header__account ${
          chechLocation('/') && 'header__acount_main'
        }`}
      >
        <Link className='header__account-name' to='/profile'>
          {currentUser.name}
        </Link>
        <Link to='/profile' className='header__account-button' />
      </div>
      <button onClick={handleNavTabOpen} className='header__nav-tab' />
    </>
  );

  return (
    <>
      <header
        className={`header ${chechLocation('/') ? 'header_landing' : ''}`}
      >
        {isLoggedIn
          ? mainHeaderContent
          : chechLocation('/')
          ? landingHeaderContent
          : mainHeaderContent}
      </header>
      <NavTab isOpened={navTabIsOpened} onClose={handleNavTabClose} />
    </>
  );
};

export default Header;
