import i18next from 'i18next';
import { FuseNavigationType } from '@fuse/core/FuseNavigation/types/FuseNavigationType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import vn from './navigation-i18n/vn';

i18next.addResourceBundle('vn', 'navigation', vn);
i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavigationType = [
	{
		id: 'example-component',
		title: 'Example',
		translate: 'SHOPPING',
		type: 'item',
		icon: 'heroicons-outline:star',
		url: 'example'
	},
	{
		id: 'meal-plan',
		title: 'Meal-Plan',
		translate: 'Meal-Plan',
		type: 'group',
		icon: 'heroicons-outline:star',
		children: [
			{
				id: 'meal-plan.Cages',
				title: 'New meal-plan',
				type: 'item',
				icon: 'heroicons-outline:rectangle-stack',
				url: '/meal-plan/cages',
				end: true,
			}
		]
	},

];

export default navigationConfig;
