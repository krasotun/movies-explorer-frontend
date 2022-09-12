import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import SearchButton from '../SearchButton/SearchButton';
import SearchButtonDisabled from '../SearchButtonDisabled/SearchButtonDisabled';

function SearchForm({ onSubmit }) {
	const [search, setSearch] = React.useState('');
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ mode: 'onChange' });
	function handleSearchChange(event) {
		setSearch(event.target.value);
	}
	const handleSearchFormSubmit = () => {
		onSubmit(search);
	};
	return (
		<form noValidate onSubmit={handleSubmit(handleSearchFormSubmit)} className="form search-form">
			<input
				{...register('search', {
					required: 'Обязательное поле',
					onChange: (e) => handleSearchChange(e),
				})}
				className="search-form__text-input"
				type="text"
				name="search"
				value={search || ''}
			/>
			<button disabled={!isValid} className="button search-form__submit-button" type="submit">
				{isValid
					? <SearchButton />
					: <SearchButtonDisabled />}
			</button>
			<span className="search-form__error">
				<ErrorMessage
					errors={errors}
					name="search"
					render={({ message }) => <p className="search-form__error-text">{message}</p>}
				/>
			</span>
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
