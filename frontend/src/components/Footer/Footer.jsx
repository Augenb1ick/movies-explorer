import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__heading'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__links-container'>
        <p className='footer__link'>@ {new Date().getFullYear()}</p>
        <a
          className='footer__link'
          target='_blank'
          rel='noreferrer'
          href='https://practicum.yandex.ru/'
        >
          Яндекс.Практикум
        </a>
        <a
          className='footer__link'
          target='_blank'
          rel='noreferrer'
          href='https://github.com/Augenb1ick'
        >
          Github
        </a>
      </div>
    </footer>
  );
};

export default Footer;
