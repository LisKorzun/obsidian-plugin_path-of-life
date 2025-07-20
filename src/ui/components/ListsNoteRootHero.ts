import { App, TFile } from 'obsidian';

import PathOfLifePlugin from 'main';
import { HeroTabs } from './index';
import { ViewComponent } from './types';

export class ListsNoteRootHero implements ViewComponent {
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
		this.renderAddButtons();
	}
	renderTitle() {
		const title = this.container.createDiv('pol__hero-title');
		title.innerText = 'Lists';
	}

	renderAddButtons() {
		const tabsEl = this.container.createDiv();
		new HeroTabs(tabsEl, this.plugin.settings.listTypes, this.plugin).display();
	}
}
