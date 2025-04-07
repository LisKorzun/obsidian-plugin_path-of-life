import { App, TFile } from 'obsidian';

import PathOfLifePlugin from 'main';
import { fileCreateFromTemplate, fileHighlight, fileDelete } from 'utils';
import { noteRootTemplate } from 'ui/templates';
import { NoteRoot } from 'ui/modals';

import { ViewAction } from './types';

export const getNoteActions: (plugin: PathOfLifePlugin) => ViewAction[] = (
	plugin: PathOfLifePlugin
) => {
	return [
		{
			cta: 'New Root Note',
			tooltip: 'Create the root note',
			icon: 'lucide-folder-tree',
			onClick: () => {
				new NoteRoot(plugin.app, plugin, createRoot(plugin.app)).open();
			},
		},
		{
			cta: 'New Child Note',
			tooltip: 'Create the child note',
			icon: 'lucide-baby',
			onClick: () => {
				console.log('Icon button clicked!');
			},
		},
	];
};

function createRoot(app: App) {
	return async function (path: string) {
		await fileCreateFromTemplate(app, path, noteRootTemplate);
		await fileHighlight(app, path);
	};
}

export const getNoteRightActions: (
	plugin: PathOfLifePlugin,
	file: TFile
) => ViewAction[] = (plugin: PathOfLifePlugin, file: TFile) => {
	return [
		{
			cta: 'Delete note',
			tooltip: 'Danger! Delete note',
			icon: 'lucide-trash',
			cls: 'pol__view-action-button-inversion',
			onClick: () => {
				fileDelete(plugin.app, file);
			},
		},
	];
};
