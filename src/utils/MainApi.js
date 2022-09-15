class MainApi {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}

	// eslint-disable-next-line class-methods-use-this
	_checkServerStatus(res) {
		if (res.ok) {
			console.log(res);
			return res.json();
		} return console.log(res);
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
				...this.headers,
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		}).then(this.__checkServerStatus);
	}
}
export const mainApi = new MainApi({
	baseUrl: 'http://localhost:3000',
	// baseUrl: 'https://api.krasotun.nomoredomains.sbs',
	headers: {
		'Content-Type': 'application/json',
	},
});
