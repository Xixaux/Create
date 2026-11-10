import { redirect } from 'next/navigation';

function DashboardsPage() {
	redirect(`/apps/environment-developer`);
	return null;
}

export default DashboardsPage;
