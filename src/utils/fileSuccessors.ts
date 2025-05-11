import { App, TFile, TFolder } from 'obsidian';

import { compareFileSequence } from './propertyUtils';
import { fileFrontMatterGet } from './fileFrontMatterGet';

/**
 * Returns all successors for the filePath.
 * @param app - The Obsidian App instance.
 * @param basename - File basename as predecessor.
 * @param folderPath - The path of the folder to search for the files.
 * @param rootOnly - Return the root files only.
 */
export async function fileSuccessorsGet(
	app: App,
	basename: string,
	folderPath: string,
	rootOnly: boolean = false
): Promise<TFile[]> {
	try {
		const folder = app.vault.getAbstractFileByPath(folderPath);
		const files: TFile[] = [];
		if (folder && folder instanceof TFolder) {
			for (const child of folder.children) {
				if (child instanceof TFile) {
					const frontMatter = await fileFrontMatterGet(this.app, child);
					if (rootOnly) {
						if (frontMatter && !frontMatter['predecessor']) {
							files.push({ ...child, ...frontMatter });
						}
					} else {
						if (
							frontMatter &&
							frontMatter['predecessor'] &&
							frontMatter['predecessor'].contains(basename)
						) {
							files.push({ ...child, ...frontMatter });
						}
					}
				}
			}
		}
		return files.sort(compareFileSequence);
	} catch (e) {
		console.log(e);
		return [];
	}
}
