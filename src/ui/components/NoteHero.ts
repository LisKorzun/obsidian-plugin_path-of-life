import { TFile } from 'obsidian';

import PathOfLifePlugin from 'main';

import { renderActions } from '../actions/renderActions';
import {
	getNoteActions,
	getNoteRightActions,
} from '../actions/actionsForNotes';

interface ViewComponent {
	display(): void;
}

export class NoteHero implements ViewComponent {
	plugin: PathOfLifePlugin;
	file: TFile;
	container: HTMLElement;

	constructor(plugin: PathOfLifePlugin, file: TFile, container: HTMLElement) {
		this.container = container;
		this.plugin = plugin;
		this.file = file;
	}

	display() {
		this.renderTopHeader();
		this.renderBreadcrumbs();
		this.renderTitle();
		this.renderContents();
	}

	renderTopHeader() {
		const header = this.container.createDiv('pol__hero-heading-container');
		header.createDiv({ text: 'ЗАМЕТКА', cls: 'pol__hero-header' });
		const rightEl = header.createDiv();
		renderActions(rightEl, getNoteRightActions(this.plugin, this.file));
	}

	renderBreadcrumbs() {
		const breadcrumbEl = this.container.createDiv(
			'pol__hero-breadcrumbs-container'
		);
	}
	renderTitle() {
		const title = this.container.createDiv('pol__hero-title-container');
		title.innerText = this.file.basename;
	}

	renderContents() {
		const contents = this.container.createDiv('pol__hero-contents-container');
		contents.createDiv({ text: '', cls: 'pol__hero-header' });
		const rightEl = contents.createDiv('pol__actions-container');
		renderActions(rightEl, getNoteActions(this.plugin, this.file));
	}
}
