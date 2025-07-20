import { App, normalizePath, TFolder } from 'obsidian';

/**
 * Checks whether folder exists or not
 * @param app - The Obsidian App instance.
 * @param path - The path of the folder to check.
 */
export async function folderExists(app: App, path: string): Promise<boolean> {
	const normalizedPath = normalizePath(path);
	const folder = app.vault.getFolderByPath(normalizedPath);

	return Promise.resolve(folder instanceof TFolder);
}
