import { ViewAction } from './types';

export const NOTES_ACTIONS: ViewAction[] = [
	{
		cta: 'New Root Note',
		tooltip: 'Create the root note',
		icon: 'lucide-folder-tree',
		onClick: () => {
			console.log('Icon button clicked!');
		},
	},
	{
		cta: 'New Child Note',
		tooltip: 'Create the child note',
		icon: 'lucide-baby',
		onClick: () => {
			console.log('Icon button clicked!');
		},
	},
];
