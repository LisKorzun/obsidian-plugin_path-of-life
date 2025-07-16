import { App, TFile } from 'obsidian';

import PathOfLifePlugin from 'main';

import { renderActions } from '../actions/renderActions';
import {
	getNoteActions,
	getNoteRightActions,
} from '../actions/actionsForNotes';
import {
	fileFromLinkGet,
	fileFrontMatterGet,
	fileLinkRenderer,
	fileSuccessorsGet,
} from 'utils';
import { ViewComponent } from './index';

export class HierarchicalNotesHero implements ViewComponent {
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

	async display() {
		this.container.innerHTML = '';
		this.renderTopHeader();
		await this.renderBreadcrumbs();
		this.renderTitle();
		await this.renderContents();
	}

	renderTopHeader() {
		const header = this.container.createDiv('pol__hero-heading');
		header.createDiv({ text: 'ЗАМЕТКА', cls: 'pol__hero-header' });
		const rightEl = header.createDiv({ cls: 'pol__note-actions' });
		renderActions(rightEl, getNoteRightActions(this.plugin, this.file, this));
	}

	async renderBreadcrumbs() {
		const breadcrumbEl = this.container.createDiv('pol__hero-breadcrumbs');
		const fm: any = await fileFrontMatterGet(this.app, this.file);
		const predecessor = fileFromLinkGet(this.app, fm.predecessor);
		predecessor && fileLinkRenderer(breadcrumbEl, predecessor);
	}

	renderTitle() {
		const title = this.container.createDiv('pol__hero-title');
		title.innerText = this.file.basename;
	}

	async renderContents() {
		const successors = await fileSuccessorsGet(
			this.app,
			this.file.basename,
			this.plugin.settings.hierarchicalNotesFolder
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
		attr: { id, name: id, checked: 'checked' },
	});
	container.createEl('label', {
		text,
		attr: { for: id },
	});
}
