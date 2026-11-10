'use client';

import { useEffect } from 'react';
import { Typography, Button, Container } from '@mui/material';
import Link from '@create/core/Link';
import CreateSvgIcon from '@create/core/CreateSvgIcon';

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<Container maxWidth="sm">
			<div className="flex flex-col items-center justify-center min-h-screen text-center">
				<CreateSvgIcon
					className="mb-4"
					color="error"
					size={64}
				>
					heroicons-outline:information-circle
				</CreateSvgIcon>
				<Typography
					className="text-xl lg:text-3xl mb-4"
					color="error.main"
				>
					Oops! Something went wrong
				</Typography>
				<Typography
					className="mb-8"
					color="text.secondary"
				>
					{error.message || 'An unexpected error occurred'}
				</Typography>
				<div className="flex gap-2">
					<Button
						component={Link}
						to="/"
						variant="contained"
						color="primary"
						size="small"
					>
						Go to homepage
					</Button>
					<Button
						onClick={() => reset()}
						variant="outlined"
						color="secondary"
						size="small"
					>
						Try again
					</Button>
				</div>
			</div>
		</Container>
	);
}
