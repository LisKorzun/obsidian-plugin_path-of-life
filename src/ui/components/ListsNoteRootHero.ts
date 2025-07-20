import { App, TFile } from 'obsidian';

import PathOfLifePlugin from 'main';
import { HeroTabs, ListOfBooks } from './index';
import { THeroTab, ViewComponent } from './types';

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
		new HeroTabs(tabsEl, getTabsOfLists(this.plugin)).display();
	}
}

function getTabsOfLists(plugin: PathOfLifePlugin): THeroTab[] {
	return [
		{
			label: 'Books',
			icon: 'library-big',
			content: new ListOfBooks(plugin),
		},
		{
			label: 'Keywords',
			icon: 'key-square',
			content: new ListOfBooks(plugin),
		},
		{
			label: 'Persons',
			icon: 'user',
			content: new ListOfBooks(plugin),
		},
	];
}
