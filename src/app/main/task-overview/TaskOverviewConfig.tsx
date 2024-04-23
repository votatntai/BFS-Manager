import lazyWithReducer from 'app/store/lazyWithReducer';
import { lazy } from 'react';
import TaskOverview from './TaskOverview'
import TaskTable from './task-table/TaskTable';
// const TaskManagement = lazyWithReducer('taskManagementReducer', () => import('./TaskOverview'), reducer);

const TaskOverviewConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/task-overview',
			element: <TaskOverview />
		},
		{
			path: '/task-overview/user/:id',
			// element: <TaskTable />
		},
	]
};

export default TaskOverviewConfig;
