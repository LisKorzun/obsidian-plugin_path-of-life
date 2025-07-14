import { App, TFile } from 'obsidian';

import PathOfLifePlugin from 'main';
import { renderActions } from '../actions/renderActions';
import { getAddActions } from '../actions/chronologicalNoteRootActions';
import { ViewComponent } from './index';

export class ChronologicalNoteRootHero implements ViewComponent {
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
		title.innerText = 'Chronology';
	}

	renderAddButtons() {
		const buttonsEl = this.container.createDiv('pol__in-row');
		renderActions(buttonsEl, getAddActions(this.plugin, this.file, this));
	}
}
