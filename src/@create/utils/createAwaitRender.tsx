import { useEffect, useState } from 'react';

type CreateAwaitRenderProps = {
	delay?: number;
	children: React.ReactNode;
};

function CreateAwaitRender(props: CreateAwaitRenderProps) {
	const { delay = 0, children } = props;
	const [awaitRender, setAwaitRender] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setAwaitRender(false);
		}, delay);
	}, [delay]);

	return awaitRender ? null : children;
}

export default CreateAwaitRender;
