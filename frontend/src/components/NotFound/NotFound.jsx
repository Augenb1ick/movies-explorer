import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className='not-found'>
      <h1 className='not-found__error-code'>404</h1>
      <p className='not-found__text'>Страница не найдена</p>
      <button onClick={() => navigate(-1)} className='not-found__back-btn'>
        Назад
      </button>
    </section>
  );
};

export default NotFound;
