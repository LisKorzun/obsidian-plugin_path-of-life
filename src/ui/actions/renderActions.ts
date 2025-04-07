import { ButtonComponent } from 'obsidian';
import { CLASS_NAMES } from './constants';
import { ViewAction } from './types';

/**
 * Renders specific action buttons for the view
 * @param container - HTMLElement as container for buttons
 * @param actions - List of actions
 */
export function renderActions(container: HTMLElement, actions: ViewAction[]) {
	actions.forEach((action) => {
		const btn = new ButtonComponent(container)
			.setButtonText(action.cta)
			.setTooltip(action.tooltip)
			.setIcon(action.icon)
			.setClass(CLASS_NAMES.ACTION_BUTTON)
			.onClick(action.onClick);

		action.cls && btn.setClass(`${action.cls ? action.cls : ''}`);
	});
}
