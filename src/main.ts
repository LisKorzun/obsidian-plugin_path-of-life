import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface PathOfLifeSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: PathOfLifeSettings = {
	mySetting: 'default',
};

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

class PathOfLifeSettingTab extends PluginSettingTab {
	plugin: PathOfLifePlugin;

	constructor(app: App, plugin: PathOfLifePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl).setName('Hierarchical notes').setHeading();
	}
}
