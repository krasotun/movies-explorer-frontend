import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

function SearchSection({
	onSubmit, toggleIsShortFilmsShown, isShortFilmsShown, searchRequest,
}) {
	return (
		<section className="search">
			<SearchForm
				toggleIsShortFilmsShown={toggleIsShortFilmsShown}
				isShortFilmsShown={isShortFilmsShown}
				onSubmit={onSubmit}
				searchRequest={searchRequest}
			/>
		</section>
	);
}

export default SearchSection;
