import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import { Provider } from 'react-redux';
import store from './store/store';
import Loading from './components/common/PageLoading';
import { BrowserRouter as Router } from 'react-router-dom';
import './scss/bootstrap.scss';
ReactDOM.render(
	<>
		<Suspense fallback={<Loading />}>
			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>
		</Suspense>
	</>,
	document.getElementById('root'),
);
