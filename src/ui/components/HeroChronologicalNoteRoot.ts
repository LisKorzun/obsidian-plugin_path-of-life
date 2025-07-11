import { App, TFile } from 'obsidian';

import PathOfLifePlugin from 'main';

interface ViewComponent {
	display(): void;
}

export class HeroChronologicalNoteRoot implements ViewComponent {
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
	}
	renderTitle() {
		const title = this.container.createDiv('pol__hero-title');
		title.innerText = 'Chronology';
	}
}
