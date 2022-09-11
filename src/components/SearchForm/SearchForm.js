import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import SearchButton from '../SearchButton/SearchButton';

function SearchForm({ onSubmit, isChecked }) {
	const [search, setSearch] = React.useState('');

	function handleSearchChange(event) {
		setSearch(event.target.value);
	}

	const handleSearchFormSubmit = (event) => {
		event.preventDefault();
		onSubmit(search, isChecked);
	};
	return (
		<form noValidate onSubmit={handleSearchFormSubmit} className="form search-form">
			<input
				required
				type="text"
				className="search-form__text-input"
				placeholder="Фильм"
				name="search"
				value={search || ''}
				onChange={handleSearchChange}
			/>
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
