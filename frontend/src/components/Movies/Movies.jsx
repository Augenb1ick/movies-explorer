import React, { useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SHORT_MOVIE_DURATION } from '../../utills/constants';

const Movies = ({
  isLoading,
  movies,
  onSubmit,
  onSave,
  onDelete,
  savedMovies,
  errMessage,
  searchQuery,
}) => {
  const [isShortFilm, setIsShortFilm] = useState(
    () => localStorage.getItem('isShortFilm') === 'true'
  );

  const handleShortFilmClick = () => {
    const newIsShortFilm = !isShortFilm;
    setIsShortFilm(newIsShortFilm);
    localStorage.setItem('isShortFilm', newIsShortFilm);
  };

  const filteredMovies = isShortFilm
    ? movies.filter((movie) => movie.duration < SHORT_MOVIE_DURATION)
    : movies;

  return (
    <section className='movies'>
      <SearchForm
        onSubmit={onSubmit}
        isShortFilm={isShortFilm}
        shortFilmsClick={handleShortFilmClick}
        searchQuery={searchQuery}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          onSave={onSave}
          movies={filteredMovies}
          savedMovies={savedMovies}
          onDelete={onDelete}
          errMessage={errMessage}
        />
      )}
    </section>
  );
};

export default Movies;
