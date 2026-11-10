import CreateLoading from '@create/core/CreateLoading';
import { motion } from 'motion/react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import CreateSvgIcon from '@create/core/CreateSvgIcon';
import { ProfileAlbum, useGetProfileMediaItemsQuery } from '../../ProfileApi';

type AlbumProps = {
	album: ProfileAlbum;
};

function Album(props: AlbumProps) {
	const { album } = props;

	const { data, isLoading } = useGetProfileMediaItemsQuery();

	const mediaItems = data?.filter((item) => item.album_id === album.id);

	const item = {
		hidden: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0 }
	};

	if (isLoading) {
		return <CreateLoading />;
	}

	return mediaItems?.map((media) => (
		<div
			className="w-full sm:w-1/2 md:w-1/4 p-2"
			key={media.preview}
		>
			<ImageListItem
				component={motion.div}
				variants={item}
				className="w-full rounded-xl shadow-sm overflow-hidden"
			>
				<img
					src={media.preview}
					alt={media.title}
				/>
				<ImageListItemBar
					title={media.title}
					actionIcon={
						<IconButton size="large">
							<CreateSvgIcon className="text-white opacity-75">
								heroicons-outline:information-circle
							</CreateSvgIcon>
						</IconButton>
					}
				/>
			</ImageListItem>
		</div>
	));
}

export default Album;
