import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import {
  L_CARDS_TO_SHOW_S,
  M_CARDS_TO_SHOW,
  MOBIL_CARDS_AMOUNT,
  MOBILE_WV,
  PC_CARDS_AMOUNT,
  PC_WV,
  S_PC_CARDS_AMOUNT,
  TABLET_CARDS_AMOUNT,
  TABLET_WV,
  XL_CARDS_TO_SHOW,
} from '../../utills/constants';

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
  const [cardsToShow, setCardsToShow] = useState(getInitialCardsToShow());
  const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow());

  useEffect(() => {
    setCardsToShow(getInitialCardsToShow());
  }, [currentMovieArr]);

  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getInitialCardsToShow());
      setCardsPerRow(getCardsPerRow());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getCardsPerRow() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= PC_WV) {
      return XL_CARDS_TO_SHOW;
    }

    if (screenWidth >= TABLET_WV) {
      return L_CARDS_TO_SHOW_S;
    }

    return M_CARDS_TO_SHOW;
  }

  function getInitialCardsToShow() {
    const screenWidth = window.innerWidth;

    if (screenWidth < TABLET_WV && screenWidth > MOBILE_WV) {
      return TABLET_CARDS_AMOUNT;
    } else if (screenWidth < TABLET_WV) {
      return MOBIL_CARDS_AMOUNT;
    } else if (screenWidth < PC_WV && screenWidth > TABLET_WV) {
      return S_PC_CARDS_AMOUNT;
    } else if (screenWidth < PC_WV) {
      return TABLET_CARDS_AMOUNT;
    } else {
      return PC_CARDS_AMOUNT;
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
