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
};

export type TListType = {
	id: string;
	name: string;
	order: number;
};
