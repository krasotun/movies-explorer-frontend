import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
// import Main from '../Main/Main';
import SearchSection from '../SearchSection/SearchSection';

function App() {
	// eslint-disable-next-line no-unused-vars
	const [isLoggedIn, setIsLoggedIn] = React.useState(true);

	return (
		<div className="app">
			<Header
				isLoggedIn={isLoggedIn}
			/>
			<SearchSection />
			{/* <Main /> */}
			<Footer />
		</div>
	);
}
export default App;
