import { Plugin, TFile } from 'obsidian';

import {
	DEFAULT_SETTINGS,
	PathOfLifeSettings,
	PathOfLifeSettingTab,
} from './settings/settings';
import { renderViewActions } from './ui/actions/renderViewActions';

export default class PathOfLifePlugin extends Plugin {
	settings: PathOfLifeSettings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new PathOfLifeSettingTab(this.app, this));

		const file = this.app.workspace.getActiveFile() as TFile;
		file ? await renderViewActions(this.app, file) : null;
		this.registerEvent(
			this.app.workspace.on('file-open', async (file: TFile) => {
				if (file) {
					await renderViewActions(this.app, file);
				}
			})
		);
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
