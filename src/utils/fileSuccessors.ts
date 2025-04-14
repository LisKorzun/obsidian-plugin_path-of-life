import { App, TFile, TFolder } from 'obsidian';

import { compareFileSequence } from './propertyUtils';
import { fileFrontMatterGet } from './fileFrontMatterGet';

/**
 * Returns all successors for the filePath.
 * @param app - The Obsidian App instance.
 * @param filePath - File path as predecessor.
 * @param folderPath - The path of the folder to search for the files.
 */
export async function fileSuccessorsGet(
	app: App,
	filePath: string,
	folderPath: string
): Promise<TFile[] | null> {
	try {
		const folder = app.vault.getAbstractFileByPath(folderPath);
		const files: TFile[] = [];
		if (folder && folder instanceof TFolder) {
			for (const child of folder.children) {
				if (child instanceof TFile) {
					const frontMatter = await fileFrontMatterGet(this.app, child);
					if (
						frontMatter &&
						frontMatter['predecessor'] &&
						frontMatter['predecessor'].contains(filePath)
					) {
						files.push({ ...child, ...frontMatter });
					}
				}
			}
		}
		return files.sort(compareFileSequence);
	} catch (e) {
		console.log(e);
		return null;
	}
}
