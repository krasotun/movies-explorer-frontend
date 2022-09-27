import React from 'react';

const getScreenWidth = () => document.documentElement.clientWidth;

function useScreenSize() {
	const [screenSize, setScreenSize] = React.useState({
		width: getScreenWidth(),
	});

	React.useEffect(() => {
		let timeOut = null;
		const checkResize = () => {
			clearTimeout(timeOut);
			timeOut = setTimeout(() => {
				setScreenSize({
					width: getScreenWidth(),
				});
			}, 150);
		};
		window.addEventListener('resize', checkResize);
		return () => window.removeEventListener('resize', checkResize);
	}, []);
	return screenSize;
}
export default useScreenSize;
