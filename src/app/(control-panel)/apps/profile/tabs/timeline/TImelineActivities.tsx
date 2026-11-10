import CreateLoading from '@create/core/CreateLoading';
import List from '@mui/material/List';
import { useGetProfileActivitiesQuery } from '../../ProfileApi';
import TimelineActivityItem from './TimelineActivityItem';

function TImelineActivities() {
	const { data: activities, isLoading } = useGetProfileActivitiesQuery();

	if (isLoading) {
		return <CreateLoading />;
	}

	return (
		<List className="p-0">
			{activities.map((activity) => (
				<TimelineActivityItem
					item={activity}
					key={activity.id}
				/>
			))}
		</List>
	);
}

export default TImelineActivities;
