import { getIcon } from 'obsidian';
import { THeroTab, ViewComponent } from './types';

export class HeroTabs implements ViewComponent {
	container: HTMLElement;
	navContainer: HTMLElement;
	spec: THeroTab[];

	constructor(container: HTMLElement, spec: THeroTab[]) {
		this.container = container;
		this.container.className = 'pol__hero-tabs';
		this.spec = spec;
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
			<label for="${id}" data-tab-label="${id}" role="tab">${getIcon(curr.icon)?.outerHTML}${curr.label}</label>`;
			return acc + label;
		}, '');
		this.spec.map((tab, index) => {
			const id = `tab${index + 1}`;
			const { content } = tab;
			console.log(tab, content);

			const section = this.container.createEl('section', {
				attr: { 'data-tab-panel': id, role: 'tabpanel', 'aria-labelledby': id },
			});
			content && content.display(section);
		}, {});
	}
}
