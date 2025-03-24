import { Plugin } from 'obsidian';

import {
	DEFAULT_SETTINGS,
	PathOfLifeSettings,
	PathOfLifeSettingTab,
} from './settings/settings';

export default class PathOfLifePlugin extends Plugin {
	settings: PathOfLifeSettings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new PathOfLifeSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
