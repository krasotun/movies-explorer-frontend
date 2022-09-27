import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
	const token = localStorage.getItem('jwt'); return (
		<Route>
			{() => (token ? <Component {...props} /> : <Redirect to="/" />)}
		</Route>
	);
}

export default ProtectedRoute;
