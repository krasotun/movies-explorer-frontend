import React from 'react';
import {
	Redirect, Route, Switch, useRouteMatch, useHistory,
} from 'react-router-dom';
import { auth } from '../../utils/Auth';
import { userInfo } from '../../utils/UserInfo';
import { movies } from '../../utils/Movies';
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
	const [isMenuShown, setIsMenuShown] = React.useState(false);
	const [isInfoTipShown, setInfoTipShown] = React.useState(false);
	const [formErrorMessage, setFormErrorMessage] = React.useState('');
	const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });
	const [isLoading, setIsLoading] = React.useState(false);
	const [moviesArray, setMoviesArray] = React.useState([]);
	const [isShortFilmsShown, setIsShortFilmsShown] = React.useState(false);

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
	const toggleIsShortFilmsShown = () => {
		console.log(isShortFilmsShown);
		const foundedMovies = JSON.parse(localStorage.getItem('foundedMovies'));
		const filteredMovies = foundedMovies.filter((movie) => movie.duration <= 40);
		console.log('Массив фильмов до', moviesArray);
		if (!isShortFilmsShown) {
			console.log('Отфильтровано', filteredMovies);
			setMoviesArray(filteredMovies);
			console.log('Массив фильмов после', moviesArray);
			// localStorage.setItem('foundedMovies', JSON.stringify(filteredMovies));
			setIsShortFilmsShown(true);
		} else setIsShortFilmsShown(true);
	};

	const filterBySymbols = (movie, symbols) => movie.nameRU.toLowerCase()
		.includes(symbols.toLowerCase());

	const handleMoviesSearch = (search) => {
		setIsLoading(true);
		setMoviesArray([]);
		movies.getMovies()
			.then((res) => {
				const filtered = res.filter((movie) => filterBySymbols(movie, search));
				setMoviesArray(filtered);
				localStorage.setItem('foundedMovies', JSON.stringify(filtered));
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
				history.push('/movies');
				handleTokenCheck();
			})
			.catch((err) => {
				console.log('Login', err);
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
		history.push('/');
	};
	// React.useEffect(() => {
	// 	console.log(isShortFilmsShown);
	// 	const foundedMovies = JSON.parse(localStorage.getItem('foundedMovies'));
	// 	const filteredMovies = foundedMovies.filter((movie) => movie.duration <= 40);
	// 	if (isShortFilmsShown) {
	// 		console.log('Отфильтровано', filteredMovies);
	// 		setMoviesArray(filteredMovies);
	// 		// localStorage.setItem('foundedMovies', JSON.stringify(filteredMovies));
	// 	}
	// }, [isShortFilmsShown]);

	React.useEffect(() => {
		handleTokenCheck();
		const foundedMovies = JSON.parse(localStorage.getItem('foundedMovies'));
		if (foundedMovies) {
			setMoviesArray(foundedMovies);
		}
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
					/>
					<ProtectedRoute
						isLoggedIn={isLoggedIn}
						isLoading={isLoading}
						onSubmit={handleMoviesSearch}
						path="/movies"
						component={Movies}
						moviesList={moviesArray}
						toggleIsShortFilmsShown={toggleIsShortFilmsShown}
						isShortFilmsShown={isShortFilmsShown}
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
