import { App, TFile, MarkdownView } from 'obsidian';

import PathOfLifePlugin from 'main';

import { renderActions } from './renderActions';
import { CLASS_NAMES } from './constants';
import { getNoteActions } from './actionsForNotes';

export async function renderViewActions(
	app: App,
	plugin: PathOfLifePlugin,
	file: TFile
) {
	const view: MarkdownView | null =
		app.workspace.getActiveViewOfType(MarkdownView);

	if (view !== null) {
		const containerEl: HTMLElement = view.containerEl;
		const childrenEl: Element[] = Array.from(containerEl.children);
		//@ts-ignore
		const headerEl: HTMLElement = view.headerEl;

		const isActionsContainer: any = childrenEl.find((item: HTMLElement) =>
			item.classList.contains(CLASS_NAMES.ACTIONS_CONTAINER)
		);
		if (
			isActionsContainer &&
			!file?.path?.startsWith(plugin.settings.notesFolder)
		) {
			containerEl.removeChild(isActionsContainer);
		}
		if (file?.path?.startsWith(plugin.settings.notesFolder)) {
			if (isActionsContainer) {
				containerEl.removeChild(isActionsContainer);
			}
			const viewActionsContainer = document.createElement('div');
			viewActionsContainer.addClasses([CLASS_NAMES.ACTIONS_CONTAINER]);
			renderActions(viewActionsContainer, getNoteActions(plugin));
			headerEl.insertAdjacentElement('afterend', viewActionsContainer);
		}
	}
}
