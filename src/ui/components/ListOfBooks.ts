import { IHeroTabPanel } from './types';

export class ListOfBooks implements IHeroTabPanel {
	container: HTMLElement;

	display(container: HTMLElement) {
		this.container = container;
		this.container.className = 'pol__hero-tab-list-of-books';
		this.container.innerHTML = 'Some text';
	}
}
