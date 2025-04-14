import { App, TFile, TFolder } from 'obsidian';

import PathOfLifePlugin from 'main';

import { renderActions } from '../actions/renderActions';
import {
	getNoteActions,
	getNoteRightActions,
} from '../actions/actionsForNotes';
import { fileLinkRenderer, fileSuccessorsGet } from 'utils';

export class TNoteFile extends TFile {
	sequence: string;
	predecessor?: string;
}

interface ViewComponent {
	display(): void;
}

export class NoteHero implements ViewComponent {
	app: App;
	plugin: PathOfLifePlugin;
	file: TFile;
	container: HTMLElement;

	constructor(plugin: PathOfLifePlugin, file: TFile, container: HTMLElement) {
		this.app = plugin.app;
		this.plugin = plugin;
		this.file = file;
		this.container = container;
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

	async renderBreadcrumbs() {
		const breadcrumbEl = this.container.createDiv(
			'pol__hero-breadcrumbs-container'
		);
	}
	renderTitle() {
		const title = this.container.createDiv('pol__hero-title-container');
		title.innerText = this.file.basename;
	}

	async renderContents() {
		const contents = this.container.createDiv('pol__hero-contents-container');
		contents.createDiv({ text: '', cls: 'pol__hero-header' });
		const rightEl = contents.createDiv('pol__actions-container');
		renderActions(rightEl, getNoteActions(this.plugin, this.file));
		const container = this.container.createDiv('pol__hero-children-container');
		const files = await fileSuccessorsGet(
			this.app,
			this.file.path,
			this.plugin.settings.notesFolder
		);
		if (files) {
			for (const file of files) {
				fileLinkRenderer(container, file);
			}
		}
	}
}
