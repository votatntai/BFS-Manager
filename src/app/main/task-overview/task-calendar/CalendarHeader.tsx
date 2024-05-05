import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'app/store';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FullCalendar from '@fullcalendar/react';
import { CalendarApi, DatesSetArg } from '@fullcalendar/core';
import { MutableRefObject, useEffect } from 'react';
import { openNewPlanDialog } from './store/plansSlice';
import CalendarViewMenu from './CalendarViewMenu';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';

type CalendarHeaderProps = {
	calendarRef: MutableRefObject<FullCalendar | null>;
	currentDate: DatesSetArg;
};

/**
 * The calendar header.
 */

function CalendarHeader(props: CalendarHeaderProps) {
	const { calendarRef, currentDate } = props;
	const navigate = useNavigate();
	const mainTheme = useAppSelector(selectMainTheme);
	const calendarApi = () => calendarRef?.current?.getApi();
	const dispatch = useAppDispatch();

	return (
		<div className="flex flex-col md:flex-row w-full p-12 justify-between z-10 container">
			<div className="flex flex-col sm:flex-row items-center">
				<div className="flex items-center">
					<Typography className="text-2xl font-semibold tracking-tight whitespace-nowrap mx-16">
						{currentDate?.view.title}
					</Typography>
				</div>

				<div className="flex items-center">
					<Tooltip title="Previous">
						<IconButton
							aria-label="Previous"
							onClick={() => calendarApi().prev()}
						>
							<FuseSvgIcon size={20}>
								{mainTheme.direction === 'ltr'
									? 'heroicons-solid:chevron-left'
									: 'heroicons-solid:chevron-right'}
							</FuseSvgIcon>
						</IconButton>
					</Tooltip>
					<Tooltip title="Next">
						<IconButton
							aria-label="Next"
							onClick={() => calendarApi().next()}
						>
							<FuseSvgIcon size={20}>
								{mainTheme.direction === 'ltr'
									? 'heroicons-solid:chevron-right'
									: 'heroicons-solid:chevron-left'}
							</FuseSvgIcon>
						</IconButton>
					</Tooltip>

					<Tooltip title="Today">
						<div>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1, transition: { delay: 0.3 } }}
							>
								<IconButton
									aria-label="today"
									onClick={() => calendarApi().today()}
									size="large"
								>
									<FuseSvgIcon>heroicons-outline:calendar</FuseSvgIcon>
								</IconButton>
							</motion.div>
						</div>
					</Tooltip>
				</div>
			</div>

			<motion.div
				className="flex items-center justify-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.3 } }}
			>
				<Button variant='contained' startIcon={<FuseSvgIcon>heroicons-outline:arrow-left</FuseSvgIcon>}
					onClick={() => {
						navigate(-1)
					}}
					color='secondary'
				>Back</Button>
			</motion.div>
		</div>
	);
}

export default CalendarHeader;
