import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store';
import { lazy } from 'react';
const Bird = lazyWithReducer('birdReducer', () => import('./Bird'), reducer);
const BirdDetail = lazy(() => import('./bird-detail/BirdDetail'));

const BirdConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/bird',
			element: <Bird />
		},
		{
			path: 'master-data/bird/bird-detail/:birdId',
			element: <BirdDetail />
		}
	]
};

export default BirdConfig;
