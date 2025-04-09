import { ButtonComponent } from 'obsidian';

export interface ViewAction {
	cta: string;
	tooltip: string;
	icon: string;
	cls?: string;
	onClick: (evt: MouseEvent) => void;
}

/**
 * Renders specific action buttons for the view
 * @param container - HTMLElement as container for buttons
 * @param actions - List of actions
 */
export function renderActions(container: HTMLElement, actions: ViewAction[]) {
	actions.forEach((action) => {
		const btn = new ButtonComponent(container)
			// .setButtonText(action.cta)
			.setTooltip(action.tooltip)
			.setIcon(action.icon)
			.setClass('clickable-icon')
			.onClick(action.onClick);

		action.cls && btn.setClass(`${action.cls ? action.cls : ''}`);
	});
}
