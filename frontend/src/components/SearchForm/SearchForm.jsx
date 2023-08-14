import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './SearchForm.css';
import srchIcon from '../../images/srch-icon.svg';

const SearchForm = ({
  onSubmit,
  shortFilmsClick,
  isShortFilm,
  searchQuery,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: 'onSubmit' });

  useEffect(() => setValue('query', searchQuery), [searchQuery]);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const submit = (data) => onSubmit(data.query);

  return (
    <section className='search-form'>
      <div
        className={`search-form__container ${
          isInputFocused && 'search-form__container_active'
        }`}
      >
        <form
          onSubmit={handleSubmit(submit)}
          className='search-form__input-container'
        >
          <img
            className='search-form__img'
            src={srchIcon}
            alt='картинка поиска'
          />
          <input
            {...register('query', {
              required: 'Введите название фильма',
            })}
            placeholder='Фильм'
            className='search-form__srch-input'
            type='text'
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <button type='submit' className='search-form__srch-btn'>
            Найти
          </button>
        </form>
        <div className='search-form__short-container search-form__short-container_wide-screen'>
          <button
            onClick={shortFilmsClick}
            className={`search-form__short-btn ${
              isShortFilm && 'search-form__short-btn_on'
            }`}
          />
          <p className='search-form__short-text'>Короткометражки</p>
        </div>
      </div>
      <span className='search-form__srch-input-err'>
        {errors?.query?.message}
      </span>
      <div className='search-form__short-container search-form__short-container_small-screen'>
        <button
          onClick={shortFilmsClick}
          className={`search-form__short-btn ${
            isShortFilm && 'search-form__short-btn_on'
          }`}
        />
        <p className='search-form__short-text'>Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
