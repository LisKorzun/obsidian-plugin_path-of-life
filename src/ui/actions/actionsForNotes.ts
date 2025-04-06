import PathOfLifePlugin from 'main';
import { fileCreateFromTemplate, fileHighlight } from 'utils';
import { noteRootTemplate } from 'ui/templates';
import { NoteRoot } from 'ui/modals';

import { ViewAction } from './types';
import { App } from 'obsidian';

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
