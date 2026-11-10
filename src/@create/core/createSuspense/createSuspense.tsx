import CreateLoading from '@create/core/CreateLoading';
import { ReactNode, Suspense } from 'react';
import { CreateLoadingProps } from '@create/core/CreateLoading/CreateLoading';

type CreateSuspenseProps = {
	loadingProps?: CreateLoadingProps;
	children: ReactNode;
};

/**
 * The CreateSuspense component is a wrapper around the React Suspense component.
 * It is used to display a loading spinner while the wrapped components are being loaded.
 * The component is memoized to prevent unnecessary re-renders.
 * React Suspense defaults
 * For to Avoid Repetition
 */
function CreateSuspense(props: CreateSuspenseProps) {
	const { children, loadingProps } = props;
	return <Suspense fallback={<CreateLoading {...loadingProps} />}>{children}</Suspense>;
}

export default CreateSuspense;
