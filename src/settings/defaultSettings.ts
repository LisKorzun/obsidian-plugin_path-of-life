import { TPathOfLifeSettings } from './types';
import { LIST_TYPES } from './listTypesSetting';

export const DEFAULT_SETTINGS: Partial<TPathOfLifeSettings> = {
	chronologicalNotesFolder: 'chaos/chronological',
	chronologicalNoteRoot: '✧ dashboard/chronology.md',
	chronologicalNoteFormat: 'YYYY/MM-MMMM/DD-dddd/YYYY-MM-DD HHmmss',
	hierarchicalNotesFolder: 'chaos/hierarchical',
	hierarchicalNoteRoot: '✧ dashboard/hierarchy.md',
	listsFolder: 'chaos/lists',
	listsRoot: '✧ dashboard/lists.md',
	listTypes: LIST_TYPES,
};
