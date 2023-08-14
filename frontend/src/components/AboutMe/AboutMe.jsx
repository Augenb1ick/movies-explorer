import React from 'react';
import './AboutMe.css';
import photo from '../../images/photo.jpg';

const AboutMe = () => {
  return (
    <section className='about-me'>
      <h2 className='about-me__heading'>Студент</h2>
      <div className='about-me__container'>
        <article className='about-me__content'>
          <h3 className='about-me__name'>Никита</h3>
          <p className='about-me__profession'>Фронтенд-разработчик, 27 лет</p>
          <p className='about-me__info'>
            Я родился в городе Иркутске, а живу на данный момент в Тбилиси,
            закончил факультет финансов БГУ. У меня есть жена и собака. Я люблю
            путешествовать, а ещё увлекаюсь настольным теннисом. Недавно начал
            кодить. Раньше работал финансовым аналитиком и юристом. После того,
            как прошёл курс по веб-разработке, по-настоящему полюбил это дело и
            теперь ищу работу в IT.
          </p>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://github.com/Augenb1ick/'
            className='about-me__link'
          >
            GitHub
          </a>
        </article>
        <img className='about-me__img' src={photo} alt='фото студента' />
      </div>
    </section>
  );
};

export default AboutMe;
