import { IHeroTabPanel } from './types';
import { renderActions, ViewAction } from '../actions/renderActions';
import { addBook } from '../actions/addBook';
import PathOfLifePlugin from '../../main';
import { listsBookTemplate } from '../templates';

export class ListOfBooks implements IHeroTabPanel {
	container: HTMLElement;
	plugin: PathOfLifePlugin;

	constructor(plugin: PathOfLifePlugin) {
		this.plugin = plugin;
	}

	display(container: HTMLElement) {
		this.container = container;
		this.container.className = 'pol__hero-tab-list-of-books';
		renderActions(this.container, getListOfBooksActions(this.plugin));
	}
}

function getListOfBooksActions(plugin: PathOfLifePlugin): ViewAction[] {
	return [
		{
			cta: 'Add book',
			tooltip: 'Add book',
			icon: 'circle-plus',
			cls: '',
			onClick: addBook(plugin, listsBookTemplate),
		},
	];
}
