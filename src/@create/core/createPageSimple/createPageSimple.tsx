'use client';
import CreateScrollbars from '@create/core/CreateScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { memo, ReactNode, RefObject, useImperativeHandle, useRef } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Theme } from '@mui/system';
import CreatePageSimpleHeader from './CreatePageSimpleHeader';
import CreatePageSimpleSidebar from './CreatePageSimpleSidebar';
import { CreateScrollbarsProps } from '../CreateScrollbars/CreateScrollbars';

const headerHeight = 120;
const toolbarHeight = 64;

/**
 * Props for the CreatePageSimple component.
 */
type CreatePageSimpleProps = SystemStyleObject<Theme> & {
	className?: string;
	leftSidebarContent?: ReactNode;
	leftSidebarVariant?: 'permanent' | 'persistent' | 'temporary';
	rightSidebarContent?: ReactNode;
	rightSidebarVariant?: 'permanent' | 'persistent' | 'temporary';
	header?: ReactNode;
	content?: ReactNode;
	scroll?: 'normal' | 'page' | 'content';
	leftSidebarOpen?: boolean;
	rightSidebarOpen?: boolean;
	leftSidebarWidth?: number;
	rightSidebarWidth?: number;
	rightSidebarOnClose?: () => void;
	leftSidebarOnClose?: () => void;
	contentScrollbarsProps?: CreateScrollbarsProps;
	ref?: RefObject<{ toggleLeftSidebar: (val: boolean) => void; toggleRightSidebar: (val: boolean) => void }>;
};

/**
 * The Root styled component is the top-level container for the CreatePageSimple component.
 */
const Root = styled('div')<CreatePageSimpleProps>(({ theme, ...props }) => ({
	display: 'flex',
	flexDirection: 'column',
	minWidth: 0,
	minHeight: '100%',
	position: 'relative',
	flex: '1 1 auto',
	width: '100%',
	height: 'auto',
	backgroundColor: theme.palette.background.default,

	'&.CreatePageSimple-scroll-content': {
		height: '100%'
	},

	'& .CreatePageSimple-wrapper': {
		display: 'flex',
		flexDirection: 'row',
		flex: '1 1 auto',
		zIndex: 2,
		minWidth: 0,
		height: '100%',
		backgroundColor: theme.palette.background.default,

		...(props.scroll === 'content' && {
			position: 'absolute',
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
			overflow: 'hidden'
		})
	},

	'& .CreatePageSimple-header': {
		display: 'flex',
		flex: '0 0 auto',
		backgroundSize: 'cover'
	},

	'& .CreatePageSimple-topBg': {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: headerHeight,
		pointerEvents: 'none'
	},

	'& .CreatePageSimple-contentWrapper': {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		flex: '1 1 auto',
		overflow: 'hidden',

		//    WebkitOverflowScrolling: 'touch',
		zIndex: 9999
	},

	'& .CreatePageSimple-toolbar': {
		height: toolbarHeight,
		minHeight: toolbarHeight,
		display: 'flex',
		alignItems: 'center'
	},

	'& .CreatePageSimple-content': {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 auto',
		alignItems: 'start',
		minHeight: 0,
		overflowY: 'auto',
		'& > .container': {
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100%'
		}
	},

	'& .CreatePageSimple-sidebarWrapper': {
		overflow: 'hidden',
		backgroundColor: 'transparent',
		position: 'absolute',
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				position: 'relative',
				marginLeft: 0,
				marginRight: 0,
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen
				}),
				'&.closed': {
					transition: theme.transitions.create('margin', {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen
					}),

					'&.CreatePageSimple-leftSidebar': {
						marginLeft: -props.leftSidebarWidth
					},
					'&.CreatePageSimple-rightSidebar': {
						marginRight: -props.rightSidebarWidth
					}
				}
			}
		}
	},

	'& .CreatePageSimple-sidebar': {
		position: 'absolute',
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,

		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				position: 'relative'
			}
		},
		maxWidth: '100%',
		height: '100%'
	},

	'& .CreatePageSimple-leftSidebar': {
		width: props.leftSidebarWidth,

		[theme.breakpoints.up('lg')]: {
			borderRight: `1px solid ${theme.palette.divider}`,
			borderLeft: 0
		}
	},

	'& .CreatePageSimple-rightSidebar': {
		width: props.rightSidebarWidth,

		[theme.breakpoints.up('lg')]: {
			borderLeft: `1px solid ${theme.palette.divider}`,
			borderRight: 0
		}
	},

	'& .CreatePageSimple-sidebarHeader': {
		height: headerHeight,
		minHeight: headerHeight,
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.primary.contrastText
	},

	'& .CreatePageSimple-sidebarHeaderInnerSidebar': {
		backgroundColor: 'transparent',
		color: 'inherit',
		height: 'auto',
		minHeight: 'auto'
	},

	'& .CreatePageSimple-sidebarContent': {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100%'
	},

	'& .CreatePageSimple-backdrop': {
		position: 'absolute'
	}
}));

/**
 * The CreatePageSimple component is a layout component that provides a simple page layout with a header, left sidebar, right sidebar, and content area.
 * It is designed to be used as a top-level component for an application or as a sub-component within a larger layout.
 */
function CreatePageSimple(props: CreatePageSimpleProps) {
	const {
		scroll = 'page',
		className,
		header,
		content,
		leftSidebarContent,
		rightSidebarContent,
		leftSidebarOpen = false,
		rightSidebarOpen = false,
		rightSidebarWidth = 240,
		leftSidebarWidth = 240,
		leftSidebarVariant = 'permanent',
		rightSidebarVariant = 'permanent',
		rightSidebarOnClose,
		leftSidebarOnClose,
		contentScrollbarsProps,
		ref
	} = props;

	const leftSidebarRef = useRef<{ toggleSidebar: (T: boolean) => void }>(null);
	const rightSidebarRef = useRef<{ toggleSidebar: (T: boolean) => void }>(null);
	const rootRef = useRef(null);

	useImperativeHandle(ref, () => ({
		rootRef,
		toggleLeftSidebar: (val: boolean) => {
			leftSidebarRef?.current?.toggleSidebar(val);
		},
		toggleRightSidebar: (val: boolean) => {
			rightSidebarRef?.current?.toggleSidebar(val);
		}
	}));

	return (
		<>
			<GlobalStyles
				styles={() => ({
					...(scroll !== 'page' && {
						'#create-toolbar': {
							position: 'static'
						},
						'#create-footer': {
							position: 'static'
						}
					}),
					...(scroll === 'page' && {
						'#create-toolbar': {
							position: 'sticky',
							top: 0
						},
						'#create-footer': {
							position: 'sticky',
							bottom: 0
						}
					})
				})}
			/>
			<Root
				className={clsx('CreatePageSimple-root', `CreatePageSimple-scroll-${scroll}`, className)}
				ref={rootRef}
				scroll={scroll}
				leftSidebarWidth={leftSidebarWidth}
				rightSidebarWidth={rightSidebarWidth}
			>
				<div className="z-10 flex h-full flex-auto flex-col">
					<div className="CreatePageSimple-wrapper">
						{leftSidebarContent && (
							<CreatePageSimpleSidebar
								position="left"
								variant={leftSidebarVariant || 'permanent'}
								ref={leftSidebarRef}
								open={leftSidebarOpen}
								onClose={leftSidebarOnClose}
							>
								{leftSidebarContent}
							</CreatePageSimpleSidebar>
						)}
						<div
							className="CreatePageSimple-contentWrapper"

							// enable={scroll === 'page'}
						>
							{header && <CreatePageSimpleHeader header={header} />}

							{content && (
								<CreateScrollbars
									enable={scroll === 'content'}
									className={clsx('CreatePageSimple-content')}
									scrollToTopOnRouteChange
									{...contentScrollbarsProps}
								>
									<div className="container">{content}</div>
								</CreateScrollbars>
							)}
						</div>
						{rightSidebarContent && (
							<CreatePageSimpleSidebar
								position="right"
								variant={rightSidebarVariant || 'permanent'}
								ref={rightSidebarRef}
								open={rightSidebarOpen}
								onClose={rightSidebarOnClose}
							>
								{rightSidebarContent}
							</CreatePageSimpleSidebar>
						)}
					</div>
				</div>
			</Root>
		</>
	);
}

const StyledCreatePageSimple = memo(styled(CreatePageSimple)``);

export default StyledCreatePageSimple;
