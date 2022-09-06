import React from 'react';
import {
	Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';
import { auth } from '../../utils/Auth';
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

function App() {
	// eslint-disable-next-line no-unused-vars
	const [isLoggedIn, setIsLoggedIn] = React.useState(true);
	const [isMenuShown, setIsMenuShown] = React.useState(false);
	const [isInfoTipShown, setInfoTipShown] = React.useState(false);
	// eslint-disable-next-line no-unused-vars
	const [currentUser, setCurrentUser] = React.useState({});
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

	const handleRegistration = (name, email, password) => {
		console.log('Sended');
		auth.registration(name, email, password)
			.then((res) => {
				console.log(res);
				// setInfoTipShown(true);
			})
			.catch((err) => {
				console.log(err);
				setInfoTipShown(true);
			});
	};

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
					<Route path="/saved-movies">
						<SavedMovies />
					</Route>
					<Route path="/movies">
						<Movies />
					</Route>
					<Route path="/signin">
						<Login />
					</Route>
					<Route path="/signup">
						<Register
							onRegistration={handleRegistration}
							isInfoTipShown={isInfoTipShown}
						/>
					</Route>
					<Route path="/profile">
						<Profile />
					</Route>
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
