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
	hierarchicalNoteRootTemplate,
	chronologicalNoteRootTemplate,
	listsRootTemplate,
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
	// Lists
	listsFolder: string;
	listsRoot: string;
}

export const DEFAULT_SETTINGS: Partial<PathOfLifeSettings> = {
	notesFolder: '',
	rootNote: '',
	chronologicalNotesFolder: 'chaos/chronological',
	chronologicalNoteRoot: '✧ dashboard/chronology.md',
	chronologicalNoteFormat: 'YYYY/MM-MMMM/DD-dddd/YYYY-MM-DD HHmmss',
	hierarchicalNotesFolder: 'chaos/hierarchical',
	hierarchicalNoteRoot: '✧ dashboard/hierarchy.md',
	listsFolder: 'chaos/lists',
	listsRoot: '✧ dashboard/lists.md',
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
		this.setRootNote('chronologicalNoteRoot', chronologicalNoteRootTemplate);
		this.setNotesFolder('chronologicalNotesFolder');
		this.setNoteFormat('chronologicalNoteFormat');

		new Setting(containerEl).setName('HIERARCHICAL').setHeading();
		this.setRootNote('hierarchicalNoteRoot', hierarchicalNoteRootTemplate);
		this.setNotesFolder('notesFolder');

		new Setting(containerEl).setName('LISTS').setHeading();
		this.setRootNote('listsRoot', listsRootTemplate);
		this.setNotesFolder('listsFolder');
	}

	private setRootNote(
		key: keyof PathOfLifeSettings,
		template: string,
		name: string = 'Root',
		description: string = 'This is the root note to start with.'
	) {
		new Setting(this.containerEl)
			.setName(name)
			.setDesc(description)
			.addSearch((search) => {
				new FileSuggester(this.app, search.inputEl);
				search
					.setPlaceholder(this.plugin.settings[key])
					.setValue(this.plugin.settings[key])
					.onChange(async (newFile) => {
						this.plugin.settings[key] = normalizePath(newFile);
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
							this.plugin.settings[key],
							template
						);
						await fileHighlight(this.app, this.plugin.settings[key]);
						await fileOpenByPath(this.plugin.settings[key]);
					});
			});
	}
	private setNotesFolder(
		key: keyof PathOfLifeSettings,
		name: string = 'Folder',
		description: string = 'All notes will be stored here.'
	) {
		new Setting(this.containerEl)
			.setName(name)
			.setDesc(description)
			.addButton((button) => {
				button.setIcon('rotate-ccw').onClick(async () => {
					if (DEFAULT_SETTINGS[key]) {
						await folderCreate(this.app, DEFAULT_SETTINGS[key]);
						await folderHighlight(this.app, DEFAULT_SETTINGS[key]);
						this.plugin.settings[key] = normalizePath(DEFAULT_SETTINGS[key]);
						await this.plugin.saveSettings();
						// TODO: update settings view or this input/search
					}
				});
			})
			.addSearch((search: SearchComponent) => {
				new FolderSuggest(this.app, search.inputEl);
				search
					.setPlaceholder(this.plugin.settings[key])
					.setValue(this.plugin.settings[key])
					.onChange((newFolder) => {
						this.plugin.settings[key] = normalizePath(newFolder);
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
						await folderCreate(this.app, this.plugin.settings[key]);
						await folderHighlight(this.app, this.plugin.settings[key]);
					});
			});
	}
	private setNoteFormat(
		key: keyof PathOfLifeSettings,
		name: string = 'Format',
		description: string = 'Moment syntax.'
	) {
		new Setting(this.containerEl)
			.setName(name)
			.setDesc(description)
			.addText((input) => {
				input
					.setPlaceholder(this.plugin.settings[key])
					.setValue(this.plugin.settings[key])
					.onChange(async (newFormat) => {
						this.plugin.settings[key] = newFormat;
						await this.plugin.saveSettings();
					});
			});
	}
}
