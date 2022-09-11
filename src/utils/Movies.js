class Movies {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}

	// eslint-disable-next-line class-methods-use-this
	_checkServerStatus(res) {
		if (res.ok) {
			return res.json();
		} return Promise.reject(new Error(`Ошибка: ${res.status}`));
	}

	getMovies() {
		return fetch(`${this._baseUrl}`, {
			method: 'GET',
			headers: this._headers,
		}).then(this._checkServerStatus);
	}
}

export const movies = new Movies({
	baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
	headers: {
		'Content-Type': 'application/json',
	},
});
