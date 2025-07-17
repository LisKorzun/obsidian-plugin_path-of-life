import PathOfLifePlugin from '../../main';
import { TFile } from 'obsidian';
import { ViewAction } from './renderActions';
import { ViewComponent } from '../components/types';
import { fileCreateFromTemplate } from '../../utils';
import {
	chronologicalNoteExpenseTemplate,
	chronologicalNoteQuoteTemplate,
	chronologicalNoteDiaryTemplate,
} from '../templates';

export const getAddActions: (
	plugin: PathOfLifePlugin,
	file: TFile,
	hero: ViewComponent
) => ViewAction[] = (
	plugin: PathOfLifePlugin,
	file: TFile,
	hero: ViewComponent
) => {
	return [
		{
			cta: 'Add list',
			tooltip: 'Add expense',
			icon: 'lucide-circle-dollar-sign',
			cls: '',
			onClick: addChronologicalNote(plugin, chronologicalNoteExpenseTemplate),
		},
		{
			cta: 'Add diary',
			tooltip: 'Add diary',
			icon: 'lucide-notebook-pen',
			cls: '',
			onClick: addChronologicalNote(plugin, chronologicalNoteDiaryTemplate),
		},
		{
			cta: 'Add quote',
			tooltip: 'Add quote',
			icon: 'lucide-quote',
			cls: '',
			onClick: addChronologicalNote(plugin, chronologicalNoteQuoteTemplate),
		},
	];
};

function addChronologicalNote(plugin: PathOfLifePlugin, template: string) {
	return async function () {
		const now = window.moment();
		const fileDate = now.format(plugin.settings.chronologicalNoteFormat);

		await fileCreateFromTemplate(
			plugin.app,
			`${plugin.settings.chronologicalNotesFolder}/${fileDate}.md`,
			template,
			{}
		);
	};
}
