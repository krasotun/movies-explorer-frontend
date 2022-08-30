import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';

function App() {
	// eslint-disable-next-line no-unused-vars
	const [isLoggedIn, setIsLoggedIn] = React.useState(true);

	return (
		<div className="app">
			<Header
				isLoggedIn={isLoggedIn}
			/>
			<Main />
			<Footer />
		</div>
	);
}
export default App;
