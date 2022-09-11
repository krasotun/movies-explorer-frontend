import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

function SearchSection({ onSubmit }) {
	return (
		<section className="search">
			<SearchForm
				onSubmit={onSubmit}
			/>
		</section>
	);
}

export default SearchSection;
