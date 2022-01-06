import React from 'react'
import { Route, Switch } from 'react-router-dom';
import {Routes} from '../routes'
import Header from '../components/common/Header'

const App = () => {
	    return (
			<div className=''>
				<Header />
				<Switch>
					{Routes.map((route, idx) => (
						<Route
							key={idx}
							exact={route.exact}
							path={route.path}
							component={route.component}
						/>
					))}
				</Switch>
			</div>
		);
}

export default App
