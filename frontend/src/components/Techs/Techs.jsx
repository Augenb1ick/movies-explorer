import React from 'react';
import './Techs.css';

const Techs = () => {
  return (
    <div className='techs'>
      <h2 className='techs__heading'>Технологии</h2>
      <div className='techs__info'>
        <h3 className='techs__info-heading'>7 Технологий</h3>
        <p className='techs__info-text'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <ul className='tech-container'>
        <li className='tech'>HTML</li>
        <li className='tech'>CSS</li>
        <li className='tech'>JS</li>
        <li className='tech'>React</li>
        <li className='tech'>Git</li>
        <li className='tech'>Express.js</li>
        <li className='tech'>MongoDB</li>
      </ul>
    </div>
  );
};

export default Techs;
