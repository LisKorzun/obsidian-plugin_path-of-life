import { IHeroTabPanel } from './types';
import { renderActions, ViewAction } from '../actions/renderActions';

export class ListOfBooks implements IHeroTabPanel {
	container: HTMLElement;

	display(container: HTMLElement) {
		this.container = container;
		this.container.className = 'pol__hero-tab-list-of-books';
		renderActions(this.container, getListOfBooksActions());
	}
}

function getListOfBooksActions(): ViewAction[] {
	return [
		{
			cta: 'Add book',
			tooltip: 'Add book',
			icon: 'circle-plus',
			cls: '',
			onClick: () => {
				console.log('Add book clicked');
			},
		},
	];
}
