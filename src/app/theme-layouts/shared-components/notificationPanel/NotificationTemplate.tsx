import { ForwardedRef, forwardRef } from 'react';
import { SnackbarContent } from 'notistack';
import { NotificationModelType } from 'app/theme-layouts/shared-components/notificationPanel/models/NotificationModel';
import NotificationCard from './NotificationCard';
import { toggleNotificationPanel } from './store/stateSlice';
import { useAppDispatch } from 'app/store';

type NotificationTemplateProps = {
	item: NotificationModelType;
};

/**
 * The notification template.
 */
const NotificationTemplate = forwardRef((props: NotificationTemplateProps, ref: ForwardedRef<HTMLDivElement>) => {
	const { item } = props;
	const dispatch = useAppDispatch();

	return (
		<SnackbarContent
			ref={ref} onClick={()=>{dispatch(toggleNotificationPanel())}}
			className="pointer-events-auto cursor-pointer relative mx-auto w-full max-w-320 py-4"
		>
			<NotificationCard className='shadow-7' 
				item={item}
			/>
		</SnackbarContent>
	);
});

export default NotificationTemplate;
