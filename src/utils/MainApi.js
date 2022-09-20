class MainApi {
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

	getMovies(token) {
		return fetch(`${this._baseUrl}/movies`, {
			method: 'GET',
			headers: {
				...this.headers,
				Authorization: `Bearer ${token}`,
			},
		}).then(this._checkServerStatus);
	}

	saveMovie(data, token) {
		return fetch(`${this._baseUrl}/movies`, {
			method: 'POST',
			headers: {
				...this._headers,
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		}).then(this._checkServerStatus);
	}

	deleteMovie(id, token) {
		return fetch(`${this._baseUrl}/movies/${id}`, {
			method: 'DELETE',
			headers: {
				...this._headers,
				Authorization: `Bearer ${token}`,
			},
		}).then(this._checkServerStatus);
	}
}
export const mainApi = new MainApi({
	baseUrl: 'https://api.krasotun.nomoredomains.sbs',
	headers: {
		'Content-Type': 'application/json',
	},
});
