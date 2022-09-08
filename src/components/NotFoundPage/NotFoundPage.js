import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';

function NotFoundPage() {
	const history = useHistory();
	const goBack = () => history.goBack();
	return (
		<section className="not-found">
			<div className="not-found__block">
				<h1 className="not-found__title">
					404
				</h1>
				<p className="not-found__text">
					Страница не найдена
				</p>
			</div>
			<Button
				type="not-found-page-go-back"
				onClick={goBack}
				label="Назад"
			/>
		</section>
	);
}

export default NotFoundPage;
