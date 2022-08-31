import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import SearchButton from '../SearchButton/SearchButton';

function SearchForm() {
	return (
		<form className="form search-form">
			<input type="text" className="search-form__text-input" placeholder="Фильм" />
			<button className="button search-form__submit-button" type="submit">
				<SearchButton />
			</button>
			<div className="search-form__content">
				<FilterCheckbox
					className="search-form__check-box"
				/>
				<p className="search-form__text">Короткометражки</p>
			</div>
		</form>
	);
}

export default SearchForm;
