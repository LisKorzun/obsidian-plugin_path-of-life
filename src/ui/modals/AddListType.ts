import { App, Modal, Setting } from 'obsidian';
import PathOfLifePlugin from '../../main';
import { folderExists } from '../../utils';

export class AddListType extends Modal {
	constructor(
		app: App,
		private _plugin: PathOfLifePlugin
	) {
		super(app);
	}

	async onOpen() {
		const { contentEl } = this;
		let path: string = '';
		let exists: boolean = false;
		new Setting(contentEl).setDesc(
			'This name will be used for labels and folder.'
		);
		const inputEl = new Setting(contentEl).addText((input) => {
			input.setPlaceholder('Type the new type').onChange(async (newName) => {
				path = `${this._plugin.settings.listsFolder}/${newName}`;
				exists = await folderExists(this.app, path);
			});
			input.inputEl.addClass('templater_search');
		});
		inputEl.infoEl.remove();
	}
}
