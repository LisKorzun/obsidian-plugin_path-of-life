import { App, TFile } from 'obsidian';

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
		const header = this.container.createDiv('pol__hero-heading');
		header.createDiv({ text: 'ЗАМЕТКА', cls: 'pol__hero-header' });
		const rightEl = header.createDiv();
		renderActions(rightEl, getNoteRightActions(this.plugin, this.file));
	}

	async renderBreadcrumbs() {
		const breadcrumbEl = this.container.createDiv('pol__hero-breadcrumbs');
	}

	renderTitle() {
		const title = this.container.createDiv('pol__hero-title');
		title.innerText = this.file.basename;
	}

	async renderContents() {
		const successors = await fileSuccessorsGet(
			this.app,
			this.file.path,
			this.plugin.settings.notesFolder
		);

		const details = this.container.createDiv('pol__hero-details');
		const actions = details.createDiv('pol__hero-actions');
		renderActions(actions, getNoteActions(this.plugin, this.file));
		const contentCTA = details.createDiv('pol__hero-contents-cta');
		renderExpandableCTA(
			contentCTA,
			`contents (${successors.length})`,
			'note-contents'
		);

		const contents = details.createDiv('pol__hero-contents');
		successors.forEach((file) => fileLinkRenderer(contents, file));
	}
}

function renderExpandableCTA(container: HTMLElement, text: string, id: string) {
	container.createEl('input', {
		type: 'checkbox',
		attr: { id, name: id },
	});
	container.createEl('label', {
		text,
		attr: { for: id },
	});
}
