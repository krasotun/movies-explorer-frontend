import React from 'react';
import {
	Redirect, Route, Switch, useRouteMatch, useHistory,
} from 'react-router-dom';
import { auth } from '../../utils/Auth';
import { userInfo } from '../../utils/UserInfo';
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
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	const [isMenuShown, setIsMenuShown] = React.useState(false);
	const [isInfoTipShown, setInfoTipShown] = React.useState(false);
	const [formErrorMessage, setFormErrorMessage] = React.useState('');
	const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });

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

	const toggleMenuShown = () => {
		if (isMenuShown) {
			setIsMenuShown(false);
		} else setIsMenuShown(true);
	};

	const handleEditUserInfo = () => {
		console.log('onEditUserInfo');
	};

	const handleRegistration = (name, email, password) => {
		auth.registration(name, email, password)
			.then((res) => {
				console.log(res);
				// setInfoTipShown(true);
			})
			.catch(() => {
				setInfoTipShown(true);
				setFormErrorMessage('Ошибка при регистрации');
			});
	};
	const handleTokenCheck = React.useCallback(() => {
		const token = localStorage.getItem('jwt');
		auth.checkTokenValidity(token)
			.then(() => {
				setIsLoggedIn(true);
				history.push('/movies');
			})
			.catch((err) => {
				console.log(err);
			});
	}, [history]);

	React.useEffect(() => {
		const token = localStorage.getItem('jwt');
		if (token) {
			handleTokenCheck();
		}
	}, [handleTokenCheck]);

	const handleLogin = (email, password) => {
		auth.authorization(email, password)
			.then((res) => {
				setIsLoggedIn(true);
				localStorage.setItem('jwt', res.token);
				history.push('/movies');
				handleTokenCheck();
			})
			.catch(() => {
				setInfoTipShown(true);
				setFormErrorMessage('Ошибка при авторизации');
			});
	};

	React.useEffect(() => {
		if (isLoggedIn) {
			userInfo.getUserInfo()
				.then((res) => {
					setCurrentUser(res);
				})
				.catch((err) => {
					console.log(err);
				});
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
						path="/movies"
						component={Movies}
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
