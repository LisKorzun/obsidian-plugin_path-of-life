import { App, TFile, MarkdownView } from 'obsidian';

const NOTES = 'data/notes/mess';
const CLASS_NAME = 'view-actions-container';

export async function renderViewActions(app: App, file: TFile) {
	const view: MarkdownView | null =
		app.workspace.getActiveViewOfType(MarkdownView);

	if (view !== null) {
		const containerEl: HTMLElement = view.containerEl;
		const childrenEl: Element[] = Array.from(containerEl.children);
		//@ts-ignore
		const headerEl: HTMLElement = view.headerEl;

		appendOrRemoveActions(file, containerEl, childrenEl, headerEl);
	}
}

function appendOrRemoveActions(
	file: TFile,
	containerEl: HTMLElement,
	childrenEl: Element[],
	headerEl: HTMLElement
) {
	const isActionsContainer: any = childrenEl.find((item: HTMLElement) =>
		item.classList.contains(CLASS_NAME)
	);
	// this duplicate to RemoveChild() but its necessary for mobile users
	if (isActionsContainer && !file?.path?.startsWith(NOTES)) {
		containerEl.removeChild(isActionsContainer);
	}
	if (file?.path?.startsWith(NOTES)) {
		console.log('IF NOTES PATH');
		if (isActionsContainer) {
			containerEl.removeChild(isActionsContainer);
		}
		const viewActionsContainer = document.createElement('div');
		viewActionsContainer.addClasses([CLASS_NAME]);
		//@ts-ignore
		viewActionsContainer.style.backgroundColor = 'red';
		headerEl.insertAdjacentElement('afterend', viewActionsContainer);
	}
}
