import { App, normalizePath, PluginSettingTab, Setting } from 'obsidian';
import PathOfLifePlugin from 'main';
import { FolderSuggest } from 'ui/suggesters/FolderSuggester';
import { FileSuggester } from 'ui/suggesters/FileSuggester';
import {
	fileCreateFromTemplate,
	fileHighlight,
	fileOpenByPath,
	folderCreate,
	folderHighlight,
} from '../utils';
import { noteRootTemplate } from '../ui/templates';

export interface PathOfLifeSettings {
	// Hierarchical notes
	notesFolder: string;
	rootNote: string;
}

export const DEFAULT_SETTINGS: Partial<PathOfLifeSettings> = {
	notesFolder: '',
	rootNote: '',
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
		this.addRootNoteSetting(containerEl);
		this.addNotesFolderSetting(containerEl);
	}

	private addNotesFolderSetting(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName('Notes folder')
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
	private addRootNoteSetting(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName('Root note')
			.setDesc('This is the root note to start with.')
			.addSearch((search) => {
				new FileSuggester(this.app, search.inputEl);
				search
					.setPlaceholder('dashboard/notes.md')
					.setValue(this.plugin.settings.rootNote)
					.onChange((newFile) => {
						this.plugin.settings.rootNote = normalizePath(newFile);
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
						await fileCreateFromTemplate(
							this.app,
							this.plugin.settings.rootNote,
							noteRootTemplate
						);
						await fileHighlight(this.app, this.plugin.settings.rootNote);
						await fileOpenByPath(this.plugin.settings.rootNote);
					});
			});
	}
}
