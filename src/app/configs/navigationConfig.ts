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
				id: 'task-management',  
				title: 'Task management',
				type: 'item',
				url: '/task-management',
				icon: 'heroicons-outline:view-boards'
			},
		]
	},
];

export default navigationConfig;
