import { redirect } from 'next/navigation';

function MainPage() {
	redirect(`/apps/environment-developer`);
	return null;
}

export default MainPage;
