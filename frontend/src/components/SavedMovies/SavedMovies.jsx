import React, { useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SHORT_MOVIE_DURATION } from '../../utills/constants';

const SavedMovies = ({ savedMovies, onSubmit, onDelete, errMessage }) => {
  const [isShortFilm, setIsShortFilm] = useState(
    () => localStorage.getItem('isShortSavedFilm') === 'true'
  );

  const handleShortFilmClick = () => {
    const newIsShortFilm = !isShortFilm;
    setIsShortFilm(newIsShortFilm);
    localStorage.setItem('isShortSavedFilm', newIsShortFilm);
  };

  const filteredMovies = isShortFilm
    ? savedMovies.filter((movie) => movie.duration < SHORT_MOVIE_DURATION)
    : savedMovies;

  return (
    <div className='saved-movies'>
      <SearchForm
        onSubmit={onSubmit}
        isShortFilm={isShortFilm}
        shortFilmsClick={handleShortFilmClick}
      />
      <MoviesCardList
        savedMovies={filteredMovies}
        onDelete={onDelete}
        errMessage={errMessage}
      />
    </div>
  );
};

export default SavedMovies;
