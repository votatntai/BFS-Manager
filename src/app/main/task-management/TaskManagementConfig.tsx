import lazyWithReducer from 'app/store/lazyWithReducer';
import { lazy } from 'react';
import reducer from './slice/store';
const Task = lazy(() => import('./task/Task'));
const TaskManagement = lazyWithReducer('taskManagementReducer', () => import('./TaskManagement'), reducer);

const TaskManagementConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/task-management',
			element: <TaskManagement />
		},
		{
			path: '/task-management/task/:cageId/:cageName',
			element: <Task/>
		}
	]
};

export default TaskManagementConfig;
