import React from 'react';
import SearchButton from '../SearchButton/SearchButton';

function SearchForm() {
	return (
		<form className="form search-form">
			<input type="text" className="search-form__text-input" placeholder="Фильм" />
			<button className="button search-form__submit-button" type="submit">
				<SearchButton />
			</button>
		</form>
	);
}

export default SearchForm;
