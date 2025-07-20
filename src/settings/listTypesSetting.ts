import { TListType } from './types';

export const LIST_TYPES: TListType[] = [
	{
		id: crypto.randomUUID(),
		name: 'Book',
		order: 1,
	},
	{
		id: crypto.randomUUID(),
		name: 'Keywords',
		order: 2,
	},
	{
		id: crypto.randomUUID(),
		name: 'Persons',
		order: 3,
	},
];
