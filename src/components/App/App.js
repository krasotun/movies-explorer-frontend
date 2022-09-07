import React from 'react';
import {
	Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';
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
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	const [isMenuShown, setIsMenuShown] = React.useState(false);
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

	return (
		<div className="app">
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
					<Register />
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
		</div>
	);
}
export default App;
