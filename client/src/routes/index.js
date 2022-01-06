import { lazy } from 'react';
import {
	HUNTERS_VALLEY,
	TRADING_POST,
	INSTRUCTIONS,
	INVENTORY,
	TRAINING_GROUND,
} from './routesPath';

export const NavbarRoutes = [
	{
		path: HUNTERS_VALLEY,
		pathForNavabr: HUNTERS_VALLEY,
		title: 'Hunter’s Valley',
		exact: true,
		component: lazy(() => import('../views/pages/HuntersValley')),
	},
	{
		path: TRADING_POST,
		title: 'Trading post',
		pathForNavabr: TRADING_POST,
		exact: true,
		component: lazy(() => import('../views/pages/TradingPost')),
	},
	{
		path: INVENTORY,
		title: 'Inventory',
		pathForNavabr: '/inventory/all',
		exact: true,
		component: lazy(() => import('../views/pages/Inventory')),
	},

	{
		path: TRAINING_GROUND,
		pathForNavabr: TRAINING_GROUND,
		title: 'Training Ground',
		exact: true,
		component: lazy(() => import('../views/pages/TrainingGround')),
	},
	{
		path: INSTRUCTIONS,
		pathForNavabr: INSTRUCTIONS,
		title: 'More',
		exact: true,
		component: lazy(() => import('../views/pages/HowToPlay')),
	},
];

export const Routes = [
	...NavbarRoutes,
];


