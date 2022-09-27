class Auth {
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

	registration(name, email, password) {
		return fetch(`${this._baseUrl}/signup`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		}).then(this._checkServerStatus);
	}

	authorization(email, password) {
		return fetch(`${this._baseUrl}/signin`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				email,
				password,
			}),
		}).then(this._checkServerStatus);
	}

	checkTokenValidity(token) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				...this._headers, Authorization: `Bearer ${token}`,
			},
		}).then(this._checkServerStatus);
	}
}

export const auth = new Auth({
	baseUrl: 'https://api.krasotun.nomoredomains.sbs',
	headers: {
		'Content-Type': 'application/json',
	},
});
