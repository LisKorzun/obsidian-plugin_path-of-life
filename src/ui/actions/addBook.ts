import PathOfLifePlugin from '../../main';
import { fileCreateFromTemplate } from '../../utils';

// Рухманов А.А. Познать себя. - Молодая гвардия, 1983
// Author. Title. - Publishing house, year
// Author -> Select -> file
// Book title -> Input text -> string
// Publishing house -> Select -> file
// Year -> Select -> number

export function addBook(plugin: PathOfLifePlugin, template: string) {
	return async function () {
		const now = window.moment();
		const fileDate = now.format('YYYY-MM-DD HHmmss');

		await fileCreateFromTemplate(
			plugin.app,
			`${plugin.settings.listsFolder}/${fileDate}.md`,
			template,
			{}
		);
	};
}
