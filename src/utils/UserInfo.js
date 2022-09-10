class UserInfo {
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

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: this._headers,
		}).then(this._checkServerStatus);
	}

	setUserInfo(name, email) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name,
				email,
			}),
		}).then(this._checkServerStatus);
	}
}
const token = localStorage.getItem('jwt');

export const userInfo = new UserInfo({
	baseUrl: 'https://api.krasotun.nomoredomains.sbs',
	headers: {
		authorization: `Bearer ${token}`,
		'Content-Type': 'application/json',
	},
});
