import { TFile } from 'obsidian';
import PathOfLifePlugin from '../../main';

export interface ViewComponent {
	display(): void;
}

export class THierarchicalNoteFile extends TFile {
	sequence: string;
	predecessor?: string;
}

export interface IHeroTabPanel {
	container: HTMLElement;
	plugin: PathOfLifePlugin;
	display(container: HTMLElement): void;
}

export type THeroTab = {
	label: string;
	icon: string;
	content?: IHeroTabPanel;
};
