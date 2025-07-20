import { IHeroTabPanel } from '../ui/components/types';

export type TPathOfLifeSettings = {
	// Chronological notes
	chronologicalNotesFolder: string;
	chronologicalNoteRoot: string;
	chronologicalNoteFormat: string;
	// Hierarchical notes
	hierarchicalNoteRoot: string;
	hierarchicalNotesFolder: string;
	// Lists
	listsRoot: string;
	listsFolder: string;
	listTypes: TListType[];
};

export type TPathOfLifeSettingsStringsOnly = Exclude<
	keyof TPathOfLifeSettings,
	'listTypes'
>;

export type TListType = {
	id: string;
	name: string;
	icon: string;
	order: number;
	content?: IHeroTabPanel;
};
