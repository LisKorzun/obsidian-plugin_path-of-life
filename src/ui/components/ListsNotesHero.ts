import { App, TFile } from 'obsidian';

import PathOfLifePlugin from 'main';
import { ViewComponent } from './index';
import { fileFrontMatterGet } from '../../utils';

export class ListsNotesHero implements ViewComponent {
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
		await this.renderTitle();
	}
	async renderTitle() {
		const title = this.container.createDiv('pol__hero-title');
		const frontMatter = await fileFrontMatterGet(this.app, this.file);
		title.innerText = (frontMatter && frontMatter.type) || 'Unknown type';
	}
}
