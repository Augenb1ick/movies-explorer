import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__heading'>Портфолио</h2>
      <div className='portfolio__links'>
        <a
          href='https://github.com/Augenb1ick/How-to-learn'
          target='_blank'
          rel='noreferrer'
          className='portfolio__links-contaner'
        >
          <p className='portfolio__link-name'>Статичный сайт</p>
          <p className='portfolio__link'>↗</p>
        </a>
        <a
          href='https://github.com/Augenb1ick/Russian-travel'
          target='_blank'
          rel='noreferrer'
          className='portfolio__links-contaner'
        >
          <p className='portfolio__link-name'>Адаптивный сайт</p>
          <p className='portfolio__link'>↗</p>
        </a>
        <a
          href='https://github.com/Augenb1ick/Russian-travel'
          target='_blank'
          rel='noreferrer'
          className='portfolio__links-contaner'
        >
          <p className='portfolio__link-name'>Одностраничное приложение</p>
          <p className='portfolio__link'>↗</p>
        </a>
      </div>
    </section>
  );
};

export default Portfolio;
