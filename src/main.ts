import { Plugin, TFile } from 'obsidian';

import { PathOfLifeSettingTab } from './settings/settings';
import { renderViewActions } from './ui/actions/renderViewActions';
import { DEFAULT_SETTINGS } from './settings/defaultSettings';
import { TPathOfLifeSettings } from './settings/types';

export default class PathOfLifePlugin extends Plugin {
	settings: TPathOfLifeSettings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new PathOfLifeSettingTab(this.app, this));

		const file = this.app.workspace.getActiveFile() as TFile;
		file ? await renderViewActions(this.app, this, file) : null;
		this.registerEvent(
			this.app.workspace.on('file-open', async (file: TFile) => {
				if (file) {
					await renderViewActions(this.app, this, file);
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
