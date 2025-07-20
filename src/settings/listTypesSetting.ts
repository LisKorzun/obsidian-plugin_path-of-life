import { TListType } from './types';

export const LIST_TYPES: TListType[] = [
	{
		id: crypto.randomUUID(),
		name: 'Books',
		icon: 'library-big',
		order: 1,
	},
	{
		id: crypto.randomUUID(),
		name: 'Keywords',
		icon: 'key-square',
		order: 2,
	},
	{
		id: crypto.randomUUID(),
		name: 'Persons',
		icon: 'user',
		order: 3,
	},
];
