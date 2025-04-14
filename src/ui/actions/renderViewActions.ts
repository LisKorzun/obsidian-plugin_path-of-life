import { App, TFile, MarkdownView } from 'obsidian';

import PathOfLifePlugin from 'main';

import { NoteHero } from '../components/NoteHero';

const HERO_CLS = 'pol__view-hero';
const READING_VIEW_CLS = 'markdown-reading-view';

export async function renderViewActions(
	app: App,
	plugin: PathOfLifePlugin,
	file: TFile
) {
	const view: MarkdownView | null =
		app.workspace.getActiveViewOfType(MarkdownView);

	if (view !== null) {
		const contentEl: HTMLElement = view.contentEl;
		const readingViewEl = findChildByClassName(contentEl, READING_VIEW_CLS);
		const heroEl = findChildByClassName(readingViewEl, HERO_CLS);
		const notesPath = plugin.settings.notesFolder;

		// If view is NOTE in notes folder
		if (readingViewEl && heroEl && !file?.path?.startsWith(notesPath)) {
			readingViewEl.removeChild(heroEl);
		}
		// If view is in notes folder
		if (readingViewEl && file?.path?.startsWith(notesPath)) {
			// Clean up existed one
			if (heroEl) {
				readingViewEl.removeChild(heroEl);
			}
			const heroContainer = document.createElement('div');
			heroContainer.addClass(HERO_CLS);
			new NoteHero(plugin, file, heroContainer).display();

			readingViewEl.insertAdjacentElement('afterbegin', heroContainer);
		}
	}
}

function findChildByClassName(
	container: Element | undefined,
	className: string
): Element | undefined {
	if (!container) {
		return undefined;
	}
	const children: Element[] = Array.from(container.children);

	return children.find((item: HTMLElement) =>
		item.classList.contains(className)
	);
}
