import React from 'react';
import {
	Redirect, Route, Switch, useRouteMatch, useHistory,
} from 'react-router-dom';
import { auth } from '../../utils/Auth';
import { userInfo } from '../../utils/UserInfo';
import { movies } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrenUserContext';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import SideMenu from '../SideMenu/SideMenu';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
	const history = useHistory();
	const [isLoggedIn, setIsLoggedIn] = React.useState(null);
	const [isNotFound, setIsNotFound] = React.useState(false);
	const [isMenuShown, setIsMenuShown] = React.useState(false);
	const [isInfoTipShown, setInfoTipShown] = React.useState(false);
	const [formErrorMessage, setFormErrorMessage] = React.useState('');
	const [currentUser, setCurrentUser] = React.useState({ name: '', email: '', _id: '' });
	const [isLoading, setIsLoading] = React.useState(false);
	const [moviesArray, setMoviesArray] = React.useState([]);
	const [savedMoviesArray, setSavedMoviesArray] = React.useState([]);
	const [isShortFilmsShown, setIsShortFilmsShown] = React.useState(false);
	const [isSavedShortFilmsShown, setIsSavedShortFilmsShown] = React.useState(false);
	const [searchRequest, setSearchRequest] = React.useState('');
	// const [searchSavedRequest, setSearchSavedRequest] = React.useState('');

	const noHeaderShown = [
		'/signin',
		'/signup',
		'/404',
	];

	const noFooterShown = [
		'/signin',
		'/signup',
		'/profile',
		'/404',
	];

	const getSavedMovies = () => {
		const token = localStorage.getItem('jwt');
		if (token) {
			mainApi.getMovies(token)
				.then((res) => {
					setSavedMoviesArray(res);
				})
				.catch((err) => {
					console.log('ошибка при загрузке своих фильмов', err);
				});
		}
	};

	const saveMovie = (data) => {
		const token = localStorage.getItem('jwt');
		mainApi.saveMovie(data, token)
			.then(() => {
				getSavedMovies();
			})
			.catch((err) => {
				console.log('Ошибка сохранения фильма', err);
			});
	};

	const deleteMovie = (id) => {
		const token = localStorage.getItem('jwt');
		mainApi.deleteMovie(id, token)
			.then(() => {
				getSavedMovies();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const toggleIsSavedShortFilmsShown = () => {
		if (isSavedShortFilmsShown) {
			setIsSavedShortFilmsShown(false);
			localStorage.removeItem('savedShortMoviesChecked');
		} else {
			setIsSavedShortFilmsShown(true);
			localStorage.setItem('savedShortMoviesChecked', 'true');
		}
	};
	const toggleIsShortFilmsShown = () => {
		if (isShortFilmsShown) {
			setIsShortFilmsShown(false);
			localStorage.removeItem('shortMoviesChecked');
		} else {
			setIsShortFilmsShown(true);
			localStorage.setItem('shortMoviesChecked', 'true');
		}
	};

	const filterBySymbols = (movie, symbols) => movie.nameRU.toLowerCase()
		.includes(symbols.toLowerCase());

	const handleMoviesSearch = (search) => {
		setIsNotFound(false);
		setIsLoading(true);
		setMoviesArray([]);
		movies.getMovies()
			.then((res) => {
				const filtered = res.filter((movie) => filterBySymbols(movie, search));
				if (filtered.length === 0) {
					setIsNotFound(true);
				}
				setMoviesArray(filtered);
				localStorage.setItem('foundedMovies', JSON.stringify(filtered));
				localStorage.setItem('searchRequest', search);
				setSearchRequest(search);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSavedMoviesSearch = (search) => {
		setIsNotFound(false);
		const token = localStorage.getItem('jwt');
		setIsLoading(true);
		mainApi.getMovies(token)
			.then((res) => {
				const filtered = res.filter((movie) => filterBySymbols(movie, search));
				setSavedMoviesArray(filtered);
				if (filtered.length === 0) {
					setIsNotFound(true);
				}
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const toggleMenuShown = () => {
		if (isMenuShown) {
			setIsMenuShown(false);
		} else setIsMenuShown(true);
	};

	const handleEditUserInfo = (name, email) => {
		userInfo.setUserInfo(name, email)
			.then((res) => {
				setCurrentUser(res);
			})
			.catch(() => {
				setInfoTipShown(true);
				setFormErrorMessage('Ошибка при редактировании');
			});
	};

	const handleTokenCheck = () => {
		const token = localStorage.getItem('jwt');
		if (token) {
			auth.checkTokenValidity(token)
				.then((res) => {
					setIsLoggedIn(true);
					setCurrentUser(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	const handleLogin = (email, password) => {
		auth.authorization(email, password)
			.then((res) => {
				localStorage.setItem('jwt', res.token);
				handleTokenCheck();
				history.push('/movies');
			})
			.catch(() => {
				setInfoTipShown(true);
				setFormErrorMessage('Ошибка при авторизации');
			});
	};
	const handleRegistration = (name, email, password) => {
		auth.registration(name, email, password)
			.then(() => {
				handleLogin(email, password);
			})
			.catch(() => {
				setInfoTipShown(true);
				setFormErrorMessage('Ошибка при регистрации');
			});
	};
	const handleSignOut = (evt) => {
		evt.preventDefault();
		setIsLoggedIn(false);
		localStorage.clear();
		setCurrentUser({});
		setSearchRequest('');
		history.push('/');
	};
	React.useEffect(() => {
		const foundedMovies = JSON.parse(localStorage.getItem('foundedMovies'));
		if (foundedMovies) {
			const filteredMovies = foundedMovies.filter((movie) => movie.duration <= 40);
			const shortMoviesChecked = JSON.parse(localStorage.getItem('shortMoviesChecked'));
			if (isShortFilmsShown) {
				setMoviesArray(filteredMovies);
			} else {
				setMoviesArray(foundedMovies);
			}
			if (shortMoviesChecked) {
				setIsShortFilmsShown(true);
			}
		} else setMoviesArray([]);
	}, [isShortFilmsShown]);

	React.useEffect(() => {
		const filteredMovies = savedMoviesArray.filter((movie) => movie.duration <= 40);
		const savedShortMoviesChecked = JSON.parse(localStorage.getItem('savedShortMoviesChecked'));
		if (isSavedShortFilmsShown) {
			setSavedMoviesArray(filteredMovies);
		} else {
			setSavedMoviesArray(savedMoviesArray);
		}
		if (savedShortMoviesChecked) {
			setIsSavedShortFilmsShown(true);
		} else getSavedMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSavedShortFilmsShown]);

	React.useEffect(() => {
		handleTokenCheck();
		const foundedMovies = JSON.parse(localStorage.getItem('foundedMovies'));
		const seachRequest = localStorage.getItem('searchRequest');
		const shortMoviesChecked = JSON.parse(localStorage.getItem('shortMoviesChecked'));

		if (foundedMovies) {
			const filteredMovies = foundedMovies.filter((movie) => movie.duration <= 40);
			if (seachRequest) {
				setSearchRequest(seachRequest);
			} else if (!seachRequest) {
				setSearchRequest('');
			}
			if (!shortMoviesChecked) {
				setMoviesArray(foundedMovies);
			} else if (shortMoviesChecked) {
				setMoviesArray(filteredMovies);
			}
		} else setMoviesArray([]);
		getSavedMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn]);

	return (
		<div className="app">
			<CurrentUserContext.Provider value={currentUser}>
				{useRouteMatch(noHeaderShown)
					? null
					: (<Header onClick={toggleMenuShown} isLoggedIn={isLoggedIn} />)}
				<Switch>
					<Route exact path="/">
						<Main />
					</Route>
					<ProtectedRoute
						isLoggedIn={isLoggedIn}
						path="/saved-movies"
						component={SavedMovies}
						toggleIsShortFilmsShown={toggleIsSavedShortFilmsShown}
						moviesList={savedMoviesArray}
						deleteMovie={deleteMovie}
						isShortFilmsShown={isSavedShortFilmsShown}
						onSubmit={handleSavedMoviesSearch}
						isNotFound={isNotFound}
					/>
					<ProtectedRoute
						isLoggedIn={isLoggedIn}
						isLoading={isLoading}
						onSubmit={handleMoviesSearch}
						path="/movies"
						component={Movies}
						savedMoviesList={savedMoviesArray}
						moviesList={moviesArray}
						toggleIsShortFilmsShown={toggleIsShortFilmsShown}
						isShortFilmsShown={isShortFilmsShown}
						searchRequest={searchRequest}
						saveMovie={saveMovie}
						deleteMovie={deleteMovie}
						isNotFound={isNotFound}
					/>
					<Route path="/signin">
						<Login
							onLogin={handleLogin}
							isInfoTipShown={isInfoTipShown}
							formErrorMessage={formErrorMessage}
						/>
					</Route>
					<Route path="/signup">
						<Register
							onRegistration={handleRegistration}
							isInfoTipShown={isInfoTipShown}
							formErrorMessage={formErrorMessage}
						/>
					</Route>
					<ProtectedRoute
						path="/profile"
						isLoggedIn={isLoggedIn}
						component={Profile}
						onEditUserInfo={handleEditUserInfo}
						isInfoTipShown={isInfoTipShown}
						formErrorMessage={formErrorMessage}
						signOut={handleSignOut}
					/>
					<Route path="/404">
						<NotFoundPage />
					</Route>
					<Redirect to="/404" />
				</Switch>
				{useRouteMatch(noFooterShown) ? null : (<Footer />)}
				{isMenuShown && <SideMenu onClick={toggleMenuShown} />}
			</CurrentUserContext.Provider>
		</div>
	);
}
export default App;
