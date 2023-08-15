import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { mainApi } from '../../utills/MainApi';
import { moviesApi } from '../../utills/MoviesApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import {
  MOVIES_API_BASE_URL,
  CONFLICT_ERR,
  CONFLICT_ERR_MESSAGE,
  DENIED_ERROR,
  DENIED_ERROR_MESSAGE,
  PROFILE_SUCCESS_MESSAGE,
  SEARCH_SERVER_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
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
          thumbnail: MOVIES_API_BASE_URL + thumbnail.url,
          image: MOVIES_API_BASE_URL + thumbnail.url,
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
          setSavedSrchMovies(data);
          localStorage.setItem('savedMovies', JSON.stringify(data));
        })
        .catch(
          (err) =>
            console.log(err) || setSearchErrMessage(SEARCH_SERVER_ERROR_MESSAGE)
        );
      moviesApi
        .getMovies()
        .then((data) => {
          setAllMovies(reformApiRes(data));
        })
        .catch(
          (err) =>
            console.log(err) || setSearchErrMessage(SEARCH_SERVER_ERROR_MESSAGE)
        );
    }
  }, [isLoggedIn]);

  // login
  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
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
        if (err === DENIED_ERROR) {
          setLoginErr(DENIED_ERROR_MESSAGE);
        } else {
          setLoginErr(DENIED_ERROR_MESSAGE);
        }
      })
      .finally(() => setIsLoading(false));
  };

  // register
  const handleReg = ({ name, email, password }) => {
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          setRegisterErr('');
          handleLogin({ email, password });
        }
      })
      .catch((err) => {
        if (err === CONFLICT_ERR) {
          setRegisterErr(CONFLICT_ERR_MESSAGE);
        } else {
          setRegisterErr(SERVER_ERROR_MESSAGE);
        }
      })
      .finally(() => setIsLoading(false));
  };

  // updateProfile
  const handleProfileUpdate = ({ name, email }) => {
    setIsLoading(true);
    mainApi
      .updateUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
        setProfileMessage(PROFILE_SUCCESS_MESSAGE);
        setTimeout(() => {
          setProfileMessage('');
        }, 2000);
      })
      .catch((err) => {
        if (err === CONFLICT_ERR) {
          setProfileErr(CONFLICT_ERR_MESSAGE);
        } else {
          setProfileErr(CONFLICT_ERR_MESSAGE);
        }
      })
      .finally(() => setIsLoading(false));
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
        localStorage.setItem('savedMovies', JSON.stringify(filteredMov));
        setSavedSrchMovies(
          savedSrchMovies.filter((movie) => movie.movieId !== movieId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // logOut
  const handleSignOut = () => {
    localStorage.clear();
    setAllMovies([]);
    setSrchResMovies([]);
    setSavedSrchMovies([]);
    setSearchMovQuery('');
    setIsLoading(false);
    setSavedMovies([]);
    setCurrentUser({});
    setIsLoggedIn(false);
    setSearchErrMessage('');
    setRegisterErr('');
    setLoginErr('');
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
            element={
              !isLoggedIn ? (
                <Login
                  onLogin={handleLogin}
                  loginErr={loginErr}
                  isLoading={isLoading}
                />
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route
            path='/signup'
            element={
              !isLoggedIn ? (
                <Register
                  onRegister={handleReg}
                  registerErr={registerErr}
                  isLoading={isLoading}
                />
              ) : (
                <Navigate to='/' />
              )
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
                      isLoading={isLoading}
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
                      isLoading={isLoading}
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
