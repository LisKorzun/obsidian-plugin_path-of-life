import { App, TFolder } from 'obsidian';
import { DEFAULT_SETTINGS } from '../settings/settings';

/**
 * Creates a folder by specific path.
 * @param app - The Obsidian App instance.
 * @param folderPath - The path of the folder to highlight.
 */
export async function folderCreate(
	app: App,
	folderPath: string | undefined
): Promise<void> {
	if (folderPath) {
		try {
			// Check if the folder already exists
			const folder = app.vault.getFolderByPath(folderPath);

			if (folder instanceof TFolder) {
				console.log(`Folder already exists at path: ${folderPath}`);
			} else {
				// Create the folder
				await app.vault.createFolder(folderPath);
			}
		} catch (error) {
			console.log(error);
			return;
		}
	}
}
