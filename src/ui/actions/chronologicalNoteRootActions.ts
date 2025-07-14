import PathOfLifePlugin from '../../main';
import { TFile } from 'obsidian';
import { ViewAction } from './renderActions';
import { ViewComponent } from '../components';
import { fileCreateFromTemplate } from '../../utils';
import { chronologicalNoteExpenseTemplate } from '../templates';

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
			cta: 'Add expense',
			tooltip: 'Add expense',
			icon: 'lucide-circle-dollar-sign',
			cls: '',
			onClick: addExpense(plugin, file, hero),
		},
	];
};

function addExpense(
	plugin: PathOfLifePlugin,
	file: TFile,
	hero: ViewComponent
) {
	return async function () {
		const now = window.moment();
		const fileDate = now.format(plugin.settings.chronologicalNoteFormat);

		await fileCreateFromTemplate(
			plugin.app,
			`${plugin.settings.chronologicalNotesFolder}/${fileDate}.md`,
			chronologicalNoteExpenseTemplate,
			{}
		);
	};
}
