import { App, Modal, Notice, Setting } from 'obsidian';

import PathOfLifePlugin from 'main';
import { fileExists, fileHighlight } from 'utils';

export class NoteRoot extends Modal {
	constructor(
		app: App,
		plugin: PathOfLifePlugin,
		onSubmit: (result: string) => void
	) {
		super(app);
		this.setTitle('NEW ROOT');

		const { contentEl } = this;
		let path: string = '';
		let exists: boolean = false;

		const processSubmit = async () => {
			if (exists) {
				new Notice('Such a file already exists.');
				await fileHighlight(app, path);
				return;
			} else {
				this.close();
				onSubmit(path);
			}
		};

		// SETTINGS
		new Setting(contentEl).setDesc(
			'Should be detailed as much as you are going to search for it.'
		);
		const inputEl = new Setting(contentEl).addText((input) => {
			input
				.setPlaceholder('Type the root file name')
				.onChange(async (newName) => {
					const newPath = `${plugin.settings.hierarchicalNotesFolder}/${newName}.md`;
					path = newPath;
					exists = await fileExists(app, newPath);
					console.log(exists, newPath);
				});
			input.inputEl.addClass('templater_search');
		});
		inputEl.infoEl.remove();

		new Setting(contentEl).addButton((btn) =>
			btn.setButtonText('Submit').setCta().onClick(processSubmit)
		);

		// ADDITIONAL EVENTS
		contentEl.addEventListener('keydown', async (event) => {
			if (event.key === 'Escape') {
				this.close();
			}
			if (event.key === 'Enter') {
				event.preventDefault();
				await processSubmit();
			}
		});
	}
}
