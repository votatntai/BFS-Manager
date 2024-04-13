import { FuseNavigationType } from '@fuse/core/FuseNavigation/types/FuseNavigationType';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavigationType = [
	{
		id: 'apps',
		type: 'group',
		icon: 'heroicons-outline:cube',
		title: 'MODULES',
		children: [
			{
				id: 'meal-plan.Cages',
				title: 'Meal plan',
				type: 'item',
				icon: 'heroicons-outline:calendar',
				url: '/meal-plan/cages',
			},
			// {
			// 	id: 'bird-management',  
			// 	title: 'Bird management',
			// 	type: 'item',
			// 	url: '/bird-management',
			// },
			{
				id: 'task-management',  
				title: 'Task management',
				type: 'item',
				url: '/task-management',
				icon: 'heroicons-outline:view-boards'
			},
			{
				id: 'food-report',  
				title: 'Food report',
				type: 'item',
				url: '/food',
				icon: 'heroicons-outline:clipboard-list'
			},
			{
				id: 'ticket',  
				title: 'Ticket',
				type: 'item',
				url: '/ticket',
				icon: 'heroicons-outline:document-report'
			},
		]
	},

];

export default navigationConfig;
