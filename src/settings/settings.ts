import { App, normalizePath, PluginSettingTab, Setting } from 'obsidian';
import PathOfLifePlugin from 'main';
import { FolderSuggest } from 'ui/suggesters/FolderSuggester';
import { folderCreate } from '../utils/folderCreate';
import { folderHighlight } from '../utils/folderHighlight';

export interface PathOfLifeSettings {
	// Hierarchical notes
	notesFolder: string;
}

export const DEFAULT_SETTINGS: Partial<PathOfLifeSettings> = {
	notesFolder: '',
};

export class PathOfLifeSettingTab extends PluginSettingTab {
	plugin: PathOfLifePlugin;

	constructor(app: App, plugin: PathOfLifePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl).setName('Hierarchical Notes').setHeading();
		this.addNotesFolderSetting(containerEl);
	}

	private addNotesFolderSetting(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName('Notes folder location')
			.setDesc('All notes as mess will be stored here.')
			.addSearch((search) => {
				new FolderSuggest(this.app, search.inputEl);
				search
					.setPlaceholder('data/notes/mess')
					.setValue(this.plugin.settings.notesFolder)
					.onChange((newFolder) => {
						this.plugin.settings.notesFolder = normalizePath(newFolder);
						this.plugin.saveSettings();
					});
				// @ts-ignore
				search.containerEl.addClass('pol_notes-folder-search');
			})
			.addButton((button) => {
				button
					.setCta()
					.setButtonText('Create')
					.onClick(async () => {
						await folderCreate(this.app, this.plugin.settings.notesFolder);
						await folderHighlight(this.app, this.plugin.settings.notesFolder);
					});
			});
	}
}
