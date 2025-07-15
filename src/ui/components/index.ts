import { ChronologicalNoteRootHero } from './ChronologicalNoteRootHero';
import { ChronologicalNotesHero } from './ChronologicalNotesHero';
import { HierarchicalNoteRootHero } from './HierarchicalNoteRootHero';
import { HierarchicalNotesHero } from './HierarchicalNotesHero';
import { ListsNoteRootHero } from './ListsNoteRootHero';
import { ListsNotesHero } from './ListsNotesHero';
import { TFile } from 'obsidian';

export interface ViewComponent {
	display(): void;
}

export class THierarchicalNoteFile extends TFile {
	sequence: string;
	predecessor?: string;
}

export {
	ChronologicalNoteRootHero,
	ChronologicalNotesHero,
	HierarchicalNoteRootHero,
	HierarchicalNotesHero,
	ListsNoteRootHero,
	ListsNotesHero,
};
