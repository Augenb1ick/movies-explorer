import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { mobileWv, pcWv, tabletWv } from '../../utills/constants';

const MoviesCardList = ({
  movies,
  onSave,
  onDelete,
  savedMovies,
  errMessage,
}) => {
  const location = useLocation();
  const chechLocation = (path) => {
    return location.pathname === path ? true : false;
  };

  const currentMovieArr = chechLocation('/movies') ? movies : savedMovies;
  console.log(currentMovieArr);
  const [cardsToShow, setCardsToShow] = useState(getInitialCardsToShow());

  useEffect(() => {
    setCardsToShow(getInitialCardsToShow());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getInitialCardsToShow());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const cardsPerRow = getCardsPerRow();

  function getCardsPerRow() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= pcWv) {
      return 4;
    } else if (screenWidth >= tabletWv) {
      return 4;
    } else if (screenWidth <= mobileWv) {
      return 2;
    }
  }

  function getInitialCardsToShow() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= pcWv || screenWidth >= tabletWv) {
      return 12;
    } else {
      return 5;
    }
  }

  const handleShowMoreClick = () => {
    setCardsToShow(cardsToShow + cardsPerRow);
  };

  return (
    <>
      <div className='movies-card-list'>
        {currentMovieArr.length ? (
          chechLocation('/movies') ? (
            currentMovieArr
              .slice(0, cardsToShow)
              .map((movie) => (
                <MoviesCard
                  key={movie.movieId}
                  movie={movie}
                  onSave={onSave}
                  onDelete={onDelete}
                  savedMovies={savedMovies}
                />
              ))
          ) : (
            currentMovieArr.map((movie) => (
              <MoviesCard
                key={movie.movieId}
                movie={movie}
                onSave={onSave}
                onDelete={onDelete}
                savedMovies={savedMovies}
              />
            ))
          )
        ) : (
          <p>{errMessage}</p>
        )}
      </div>
      {chechLocation('/movies') && currentMovieArr.length > cardsToShow && (
        <button
          className='movies-card-list__more-btn'
          onClick={handleShowMoreClick}
        >
          Ещё
        </button>
      )}
    </>
  );
};

export default MoviesCardList;
