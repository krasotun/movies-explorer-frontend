import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
	// eslint-disable-next-line no-unused-vars
	const [isLoggedIn, setIsLoggedIn] = React.useState(true);
	const noHeaderShown = [
		'/signin',
		'/signup',
	];

	const noFooterShown = [
		'/signin',
		'/signup',
		'/profile',
	];

	return (
		<div className="app">
			{useRouteMatch(noHeaderShown) ? null : (<Header isLoggedIn={isLoggedIn} />)}
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

			</Switch>
			{useRouteMatch(noFooterShown) ? null : (<Footer />)}
		</div>
	);
}
export default App;
