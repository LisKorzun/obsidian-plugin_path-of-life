import { App, TFile } from 'obsidian';

import PathOfLifePlugin from 'main';
import { fileLinkRenderer, fileSuccessorsGet } from '../../utils';
import { ViewComponent } from './index';

export class NoteRootHero implements ViewComponent {
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
		this.renderTitle();
		await this.renderContents();
	}
	renderTitle() {
		const title = this.container.createDiv('pol__hero-title');
		title.innerText = 'NOTES | ЗАМЕТКИ';
	}
	async renderContents() {
		const successors = await fileSuccessorsGet(
			this.app,
			this.file.basename,
			this.plugin.settings.notesFolder,
			true
		);
		const details = this.container.createDiv();
		const contents = details.createDiv('pol__hero-root-list');
		successors.forEach((file) => fileLinkRenderer(contents, file));
	}
}
