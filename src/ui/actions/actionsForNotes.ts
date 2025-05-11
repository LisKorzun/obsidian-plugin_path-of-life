import { TFile } from 'obsidian';

import PathOfLifePlugin from 'main';
import { noteRootTemplate, noteChildTemplate } from 'ui/templates';
import { NoteRoot, NoteChild, NoteRename } from 'ui/modals';
import {
	fileCreateFromTemplate,
	fileHighlight,
	fileDelete,
	propertyAsFileLink,
} from 'utils';
import { ViewAction } from './renderActions';
import { NoteHero } from '../components/NoteHero';

export const getNoteActions: (
	plugin: PathOfLifePlugin,
	file: TFile
) => ViewAction[] = (plugin: PathOfLifePlugin, file: TFile) => {
	return [
		{
			cta: 'New Root Note',
			tooltip: 'Create the root note',
			icon: 'lucide-folder-tree',
			onClick: createRootNote(plugin),
		},
		{
			cta: 'New Child Note',
			tooltip: 'Create the child note',
			icon: 'lucide-baby',
			onClick: createChildNote(plugin, file),
		},
	];
};

export const getNoteRightActions: (
	plugin: PathOfLifePlugin,
	file: TFile,
	hero: NoteHero
) => ViewAction[] = (plugin: PathOfLifePlugin, file: TFile, hero: NoteHero) => {
	return [
		{
			cta: 'Rename note',
			tooltip: 'Rename note',
			icon: 'lucide-notebook-pen',
			cls: '',
			onClick: renameNote(plugin, file, hero),
		},
		{
			cta: 'Delete note',
			tooltip: 'Danger! Delete note',
			icon: 'lucide-trash',
			cls: '',
			onClick: async () => {
				await fileDelete(plugin.app, file);
			},
		},
	];
};

function createRootNote(plugin: PathOfLifePlugin) {
	return async function () {
		new NoteRoot(plugin.app, plugin, async (path: string) => {
			const data = {
				sequence: '1',
			};
			await fileCreateFromTemplate(plugin.app, path, noteRootTemplate, data);
			await fileHighlight(plugin.app, path);
		}).open();
	};
}

function createChildNote(plugin: PathOfLifePlugin, file: TFile) {
	return async function () {
		new NoteChild(plugin.app, plugin, async (path: string) => {
			const data = {
				predecessor: propertyAsFileLink(file),
				sequence: '1',
			};
			await fileCreateFromTemplate(plugin.app, path, noteChildTemplate, data);
			await fileHighlight(plugin.app, path);
		}).open();
	};
}

function renameNote(plugin: PathOfLifePlugin, file: TFile, hero: NoteHero) {
	return async function () {
		new NoteRename(plugin.app, plugin, file, async (path: string) => {
			await plugin.app.fileManager.renameFile(file, path);
			hero.display();
		}).open();
	};
}
