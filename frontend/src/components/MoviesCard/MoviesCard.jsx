import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { minutesConverter } from '../../utills/MinConverter';

const MoviesCard = ({ movie, onSave, onDelete, savedMovies }) => {
  const location = useLocation();
  const chechLocation = (path) => {
    return location.pathname === path ? true : false;
  };

  const isSaved = savedMovies?.some(
    (sMovie) => sMovie.movieId === movie.movieId
  );

  const toggleSave = (movie) => {
    isSaved ? onDelete(movie) : onSave(movie);
  };

  return (
    <div className='movies-card'>
      <a href={movie.trailerLink} target='_blank' rel='noopener noreferrer'>
        <img
          className='movies-card__img'
          src={movie.thumbnail}
          alt='миниатюра фильма'
        />
      </a>

      <div className='movies-card__name-like-container'>
        <p className='movies-card__name'>{movie.nameRU}</p>
        <button
          onClick={() => toggleSave(movie)}
          className={`movies-card__like-btn ${
            isSaved
              ? chechLocation('/movies')
                ? 'movies-card__like-btn_liked'
                : 'movies-card__like-btn_saved'
              : ''
          }`}
        />
      </div>
      <p className='movies-card__duration'>
        {minutesConverter(movie.duration)}
      </p>
    </div>
  );
};

export default MoviesCard;
