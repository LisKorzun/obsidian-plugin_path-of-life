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
import {
	noteRootTemplate,
	chronologicalNoteRootTemplate,
} from '../ui/templates';

export interface PathOfLifeSettings {
	notesFolder: string;
	rootNote: string;
	// Chronological notes
	chronologicalNotesFolder: string;
	chronologicalNoteRoot: string;
	chronologicalNoteFormat: string;
	// Hierarchical notes
	hierarchicalNoteRoot: string;
	hierarchicalNotesFolder: string;
}

export const DEFAULT_SETTINGS: Partial<PathOfLifeSettings> = {
	notesFolder: '',
	rootNote: '',
	chronologicalNotesFolder: 'chaos/chronological',
	chronologicalNoteRoot: '✧ dashboard/chronology.md',
	chronologicalNoteFormat: 'YYYY/MM-MMMM/DD-dddd/YYYY-MM-DD HHmmss',
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

		new Setting(containerEl).setName('CHRONOLOGICAL').setHeading();
		this.setChronologicalNoteRoot(containerEl);
		this.setChronologicalNotesFolder(containerEl);
		this.setChronologicalNoteFormat(containerEl);

		new Setting(containerEl).setName('HIERARCHICAL').setHeading();
		this.setHierarchicalNoteRoot(containerEl);
		this.setHierarchicalNotesFolder(containerEl);

		new Setting(containerEl).setName('LISTS').setHeading();
	}

	private setChronologicalNoteRoot(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName('Root')
			.setDesc('This is the root to start with chronological notes.')
			.addSearch((search) => {
				new FileSuggester(this.app, search.inputEl);
				search
					.setPlaceholder(this.plugin.settings.chronologicalNoteRoot)
					.setValue(this.plugin.settings.chronologicalNoteRoot)
					.onChange(async (newFile) => {
						this.plugin.settings.chronologicalNoteRoot = normalizePath(newFile);
						await this.plugin.saveSettings();
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
							this.plugin.settings.chronologicalNoteRoot,
							chronologicalNoteRootTemplate
						);
						await fileHighlight(
							this.app,
							this.plugin.settings.chronologicalNoteRoot
						);
						await fileOpenByPath(this.plugin.settings.chronologicalNoteRoot);
					});
			});
	}
	private setChronologicalNotesFolder(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName('Folder')
			.setDesc('The home of all chronological notes')
			.addButton((button) => {
				button.setIcon('rotate-ccw').onClick(async () => {
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
			})
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
			});
	}
	private setChronologicalNoteFormat(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName('Format')
			.setDesc('Moment syntax.')
			.addText((input) => {
				input
					.setPlaceholder(this.plugin.settings.chronologicalNoteFormat)
					.setValue(this.plugin.settings.chronologicalNoteFormat)
					.onChange(async (newFormat) => {
						this.plugin.settings.chronologicalNoteFormat = newFormat;
						await this.plugin.saveSettings();
					});
			});
	}

	private setHierarchicalNotesFolder(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName('Folder')
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
	private setHierarchicalNoteRoot(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName('Root')
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
