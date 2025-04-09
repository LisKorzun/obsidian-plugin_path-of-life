import { App, TFile, MarkdownView } from 'obsidian';

import PathOfLifePlugin from 'main';

import { NoteHero } from '../components/NoteHero';

const HERO_CONTAINER = 'pol__view-hero';

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
			item.classList.contains(HERO_CONTAINER)
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
			const heroContainer = document.createElement('div');
			heroContainer.addClass(HERO_CONTAINER);
			new NoteHero(plugin, file, heroContainer).display();

			headerEl.insertAdjacentElement('afterend', heroContainer);
		}
	}
}
