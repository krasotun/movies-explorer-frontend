import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

function SearchSection({ onSubmit, toggleIsShortFilmsShown, isShortFilmsShown }) {
	return (
		<section className="search">
			<SearchForm
				toggleIsShortFilmsShown={toggleIsShortFilmsShown}
				isShortFilmsShown={isShortFilmsShown}
				onSubmit={onSubmit}
			/>
		</section>
	);
}

export default SearchSection;
