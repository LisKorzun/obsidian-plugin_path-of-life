import { App, TFile, MarkdownView } from 'obsidian';

import PathOfLifePlugin from 'main';

import { NoteHero } from '../components/NoteHero';
import { PathOfLifeSettings } from '../../settings/settings';
import { NoteRootHero } from '../components/NoteRootHero';
import { HeroChronologicalNoteRoot } from '../components';

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

		// If view is NOTE in notes folder
		if (readingViewEl && heroEl && !checkPaths(file, plugin.settings)) {
			readingViewEl.removeChild(heroEl);
		}
		// If view is in notes folder
		if (readingViewEl && checkPaths(file, plugin.settings)) {
			// Clean up existed one
			if (heroEl) {
				readingViewEl.removeChild(heroEl);
			}
			const heroContainer = document.createElement('div');
			heroContainer.addClass(HERO_CLS);
			if (file?.path?.startsWith(plugin.settings.chronologicalNoteRoot)) {
				await new HeroChronologicalNoteRoot(
					plugin,
					file,
					heroContainer
				).display();
			}

			if (file?.path?.startsWith(plugin.settings.notesFolder)) {
				await new NoteHero(plugin, file, heroContainer).display();
			}
			if (file?.path?.startsWith(plugin.settings.rootNote)) {
				await new NoteRootHero(plugin, file, heroContainer).display();
			}

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

function checkPaths(file: TFile, settings: PathOfLifeSettings) {
	return (
		file?.path?.startsWith(settings.notesFolder) ||
		file?.path?.startsWith(settings.rootNote) ||
		file?.path?.startsWith(settings.chronologicalNoteRoot)
	);
}
