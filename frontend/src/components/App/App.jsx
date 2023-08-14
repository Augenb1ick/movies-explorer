import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { mainApi } from '../../utills/MainApi';
import { moviesApi } from '../../utills/MoviesApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import {
  conflictErr,
  conflictErrMessage,
  deniedError,
  deniedErrorMessage,
  moviesApiBaseUrl,
  profileSuccessMessage,
  searchServerErrorMessage,
  serverErrorMessage,
} from '../../utills/constants';

import './App.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // movies
  const [allMovies, setAllMovies] = useState([]);
  const [srchResMovies, setSrchResMovies] = useState(
    JSON.parse(localStorage.getItem('searchedMovies')) || []
  );
  const [savedSrchMovies, setSavedSrchMovies] = useState(
    JSON.parse(localStorage.getItem('savedMovies')) || []
  );
  const [searchMovQuery, setSearchMovQuery] = useState(
    localStorage.getItem('searchMovQuery') || ''
  );

  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  // user
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // errors
  const [searchErrMessage, setSearchErrMessage] = useState('');
  const [registerErr, setRegisterErr] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [profileErr, setProfileErr] = useState('');
  const [profileMessage, setProfileMessage] = useState('');

  // reformat api results
  const reformApiRes = (data) => {
    return data.map((movie) => {
      const {
        id,
        image: {
          formats: { thumbnail },
        },
        created_at,
        updated_at,
        ...rest
      } = movie;
      return Object.assign(
        {
          movieId: id,
          thumbnail: moviesApiBaseUrl + thumbnail.url,
          image: moviesApiBaseUrl + thumbnail.url,
        },
        rest
      );
    });
  };

  //checkToken
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .checkToken()
        .then(() => {
          setIsLoggedIn(true);
          navigate(location.pathname, { replace: true });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // getData
  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.error(err));
      mainApi
        .getUsersMovies()
        .then((data) => {
          setSavedMovies(data);
          localStorage.setItem('savedMovies', JSON.stringify(data));
        })
        .catch(
          (err) =>
            console.log(err) || setSearchErrMessage(searchServerErrorMessage)
        );
      moviesApi
        .getMovies()
        .then((data) => {
          setAllMovies(reformApiRes(data));
        })
        .catch(
          (err) =>
            console.log(err) || setSearchErrMessage(searchServerErrorMessage)
        );
    }
  }, [isLoggedIn]);

  // login
  const handleLogin = ({ email, password }) => {
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoginErr('');
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        if (err === deniedError) {
          setLoginErr(deniedErrorMessage);
        } else {
          setLoginErr(serverErrorMessage);
        }
      });
  };

  // register
  const handleReg = ({ name, email, password }) => {
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          setRegisterErr('');
          handleLogin({ email, password });
        }
      })
      .catch((err) => {
        if (err === conflictErr) {
          setRegisterErr(conflictErrMessage);
        } else {
          setRegisterErr(serverErrorMessage);
        }
      });
  };

  // updateProfile
  const handleProfileUpdate = ({ name, email }) => {
    mainApi
      .updateUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
        setProfileMessage(profileSuccessMessage);
        setTimeout(() => {
          setProfileMessage('');
        }, 2000);
      })
      .catch((err) => {
        if (err === conflictErr) {
          setProfileErr(conflictErrMessage);
        } else {
          setProfileErr(serverErrorMessage);
        }
      });
  };

  // searchMovie
  const searchMovie = (q, movies) => {
    const rusRes = movies.filter((movies) =>
      movies.nameRU.toLowerCase().includes(q.toLowerCase())
    );
    const engRes = movies.filter((movies) =>
      movies.nameEN.toLowerCase().includes(q.toLowerCase())
    );

    return rusRes.length ? rusRes : engRes;
  };
  const handleMovieSearch = (q) => {
    setIsLoading(true);
    const searchedMovies = searchMovie(q, allMovies);
    setSearchMovQuery(q);
    localStorage.setItem('searchMovQuery', q);
    setSrchResMovies(searchedMovies);
    localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
    setIsLoading(false);
    setSearchErrMessage('Ничего не найдено');
  };
  const handleSavedMovSearch = (q) => {
    setIsLoading(true);
    setSavedSrchMovies(searchMovie(q, savedMovies));
    setIsLoading(false);
    setSearchErrMessage('Ничего не найдено');
  };

  // saveMovie
  const handleMovieSave = (movie) => {
    mainApi
      .saveMovie(movie)
      .then((data) => {
        setSavedMovies([data, ...savedMovies]);
        setSavedSrchMovies([data, ...savedMovies]);
        localStorage.setItem(
          'savedMovies',
          JSON.stringify([data, ...savedMovies])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // deleteMovie
  const handleDeleteMovie = (movie) => {
    const movieId = movie.movieId;
    mainApi
      .deleteMovies(movieId)
      .then(() => {
        const filteredMov = savedMovies.filter(
          (movie) => movie.movieId !== movieId
        );

        setSavedMovies(filteredMov);
        setSavedSrchMovies(filteredMov);
        localStorage.setItem('savedMovies', JSON.stringify(filteredMov));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // logOut
  const handleSignOut = () => {
    localStorage.clear();
    setSrchResMovies([]);
    setSavedSrchMovies([]);
    setSearchMovQuery('');
    setIsLoggedIn(false);
    setLoginErr('');
    setSearchErrMessage('');
    setProfileErr('');
    setProfileMessage('');
    navigate('/', { replace: true });
  };

  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path='/signin'
            element={<Login onLogin={handleLogin} loginErr={loginErr} />}
          />
          <Route
            path='/signup'
            element={
              <Register onRegister={handleReg} registerErr={registerErr} />
            }
          />
          <Route
            path='/'
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path='/movies'
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                element={
                  <>
                    <Header />
                    <Movies
                      isLoading={isLoading}
                      movies={srchResMovies}
                      onSubmit={handleMovieSearch}
                      onSave={handleMovieSave}
                      onDelete={handleDeleteMovie}
                      savedMovies={savedMovies}
                      errMessage={searchErrMessage}
                      searchQuery={searchMovQuery}
                    />
                    <Footer />
                  </>
                }
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                element={
                  <>
                    <Header />
                    <SavedMovies
                      onSubmit={handleSavedMovSearch}
                      savedMovies={savedSrchMovies}
                      onDelete={handleDeleteMovie}
                      errMessage={searchErrMessage}
                    />
                    <Footer />
                  </>
                }
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                element={
                  <>
                    <Header />
                    <Profile
                      onUpdateProfile={handleProfileUpdate}
                      onSignOut={handleSignOut}
                      profileMessage={profileMessage}
                      profileErr={profileErr}
                    />
                  </>
                }
              />
            }
          />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
