import { useContext } from 'react';
import './NavTab.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import usePopupClose from '../../hooks/usePopupClose';

const NavTab = ({ isOpened, onClose }) => {
  const currentUser = useContext(CurrentUserContext);

  const location = useLocation();
  const chechLocation = (path) => {
    return location.pathname === path ? true : false;
  };
  const navigate = useNavigate();
  const redirect = (path) => {
    navigate(path, { replace: true });
    onClose();
  };

  usePopupClose(isOpened, onClose);

  return (
    <div className={`nav-tab ${isOpened && 'nav-tab_opened'}`}>
      <div className='nav-tab__container'>
        <button onClick={onClose} className='nav-tab__close-btn' />
        <button onClick={() => redirect('/')} className='nav-tab__btn'>
          Главная
        </button>
        <button
          onClick={() => redirect('/movies')}
          className={`nav-tab__btn ${
            chechLocation('/movies') ? 'nav-tab__btn_active' : ''
          }`}
        >
          Фильмы
        </button>
        <button
          onClick={() => redirect('/saved-movies')}
          className={`nav-tab__btn ${
            chechLocation('/saved-movies') ? 'nav-tab__btn_active' : ''
          }`}
        >
          Сохранённые фильмы
        </button>
        <div onClick={() => redirect('/profile')} className='nav-tab__account'>
          <p className='nav-tab__account-name'>{currentUser.name}</p>
          <button className='nav-tab__account-button' />
        </div>
      </div>
    </div>
  );
};

export default NavTab;
