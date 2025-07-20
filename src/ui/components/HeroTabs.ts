import { getIcon } from 'obsidian';
import { ViewComponent } from './types';
import { TListType } from '../../settings/types';
import PathOfLifePlugin from '../../main';
import { ListOfBooks } from './ListOfBooks';

export class HeroTabs implements ViewComponent {
	container: HTMLElement;
	navContainer: HTMLElement;
	spec: TListType[];
	plugin: PathOfLifePlugin;

	constructor(
		container: HTMLElement,
		spec: TListType[],
		plugin: PathOfLifePlugin
	) {
		this.container = container;
		this.container.className = 'pol__hero-tabs';
		this.spec = spec;
		this.plugin = plugin;
	}

	display() {
		this.container.innerHTML = '';
		this.render();
	}

	render() {
		this.navContainer = this.container.createEl('nav');
		this.navContainer.innerHTML = this.spec.reduce((acc, curr, index) => {
			const id = `tab${index + 1}`;
			const label = `
			<input id="${id}" type="radio" name="tab" data-tab="${id}" ${index === 0 ? 'checked="checked"' : ''}/>
			<label for="${id}" data-tab-label="${id}" role="tab">${getIcon(curr.icon)?.outerHTML}${curr.name}</label>`;
			return acc + label;
		}, '');
		this.spec.map((tab, index) => {
			const id = `tab${index + 1}`;
			const section = this.container.createEl('section', {
				attr: { 'data-tab-panel': id, role: 'tabpanel', 'aria-labelledby': id },
			});
			if (tab.name === 'Books') {
				new ListOfBooks(this.plugin).display(section);
			}
		}, {});
	}
}
