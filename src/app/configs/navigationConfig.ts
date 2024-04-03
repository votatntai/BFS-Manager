import { FuseNavigationType } from '@fuse/core/FuseNavigation/types/FuseNavigationType';

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
				end: true,
			},
			{
				id: 'task-management',  
				title: 'Task management',
				type: 'item',
				url: '/task-management',
				icon: 'heroicons-outline:view-boards'
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
