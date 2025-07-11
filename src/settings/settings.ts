import {
	App,
	normalizePath,
	PluginSettingTab,
	SearchComponent,
	Setting,
} from 'obsidian';
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
import * as sea from 'node:sea';

export interface PathOfLifeSettings {
	// Hierarchical notes
	notesFolder: string;
	rootNote: string;
	hierarchicalNoteRoot: string;
	hierarchicalNotesFolder: string;
	// Chronological notes
	chronologicalNotesFolder: string;
	chronologicalNoteRoot: string;
}

export const DEFAULT_SETTINGS: Partial<PathOfLifeSettings> = {
	notesFolder: '',
	rootNote: '',
	chronologicalNotesFolder: 'chaos/chronological',
	chronologicalNoteRoot: '✧ dashboard/chronology.md',
	hierarchicalNotesFolder: 'chaos/hierarchical',
	hierarchicalNoteRoot: '✧ dashboard/hierarchy.md',
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

		new Setting(containerEl).setName('Chronological Notes').setHeading();
		this.setChronologicalNotesFolder(containerEl);

		new Setting(containerEl).setName('Hierarchical Notes').setHeading();
		this.addRootNoteSetting(containerEl);
		this.addNotesFolderSetting(containerEl);
	}

	private setChronologicalNotesFolder(containerEl: HTMLElement) {
		console.log(this.plugin);
		new Setting(containerEl)
			.setName('Folder')
			.setDesc('The home of all chronological notes')
			.addSearch((search: SearchComponent) => {
				new FolderSuggest(this.app, search.inputEl);
				search
					.setPlaceholder(this.plugin.settings.chronologicalNotesFolder)
					.setValue(this.plugin.settings.chronologicalNotesFolder)
					.onChange((newFolder) => {
						this.plugin.settings.chronologicalNotesFolder =
							normalizePath(newFolder);
						this.plugin.saveSettings();
						// TODO: add reaction of saving
					});
				// @ts-ignore
				search.containerEl.addClass('pol_notes-folder-search');
			})
			.addButton((button) => {
				button
					.setCta()
					.setButtonText('Create')
					.onClick(async () => {
						await folderCreate(
							this.app,
							this.plugin.settings.chronologicalNotesFolder
						);
						await folderHighlight(
							this.app,
							this.plugin.settings.chronologicalNotesFolder
						);
					});
			})
			.addButton((button) => {
				button
					.setCta()
					.setButtonText('Default')
					.onClick(async () => {
						if (DEFAULT_SETTINGS.chronologicalNotesFolder) {
							await folderCreate(
								this.app,
								DEFAULT_SETTINGS.chronologicalNotesFolder
							);
							await folderHighlight(
								this.app,
								DEFAULT_SETTINGS.chronologicalNotesFolder
							);
							this.plugin.settings.chronologicalNotesFolder = normalizePath(
								DEFAULT_SETTINGS.chronologicalNotesFolder
							);
							await this.plugin.saveSettings();
							// TODO: update settings view or this input/search
						}
					});
			});
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
