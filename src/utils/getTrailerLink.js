import urlValidator from './urlValidator';

const getTrailerLink = (data) => {
	if (urlValidator(data.trailerLink)) {
		return data.trailerLink;
	} return 'https://www.youtube.com';
};

export default getTrailerLink;
