const urlValidator = (url) => {
	let checkedUrl;
	try {
		// eslint-disable-next-line no-unused-vars
		checkedUrl = new URL(url);
	} catch (e) {
		return false;
	}
	return true;
};

export default urlValidator;
