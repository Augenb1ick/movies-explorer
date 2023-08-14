import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className='about-project'>
      <h2 className='about-project__heading'>О проекте</h2>
      <article className='about-project__stages'>
        <div className='about-project__columns'>
          <p className='about-project__column-heading'>
            Дипломный проект включал 5 этапов
          </p>
          <p className='about-project__column-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__columns'>
          <p className='about-project__column-heading'>
            На выполнение диплома ушло 5 недель
          </p>
          <p className='about-project__column-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </article>
      <div className='about-project__weeks'>
        <p className='about-project__week'>1 неделя</p>
        <p className='about-project__week'>4 недели</p>
      </div>
      <div className='about-project__dev'>
        <p className='about-project__dev-text'>back-end</p>
        <p className='about-project__dev-text'>front-end</p>
      </div>
    </section>
  );
};

export default AboutProject;
