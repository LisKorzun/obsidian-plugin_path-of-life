import { App, TFile, normalizePath, Notice } from 'obsidian';
import { folderCreate } from './folderCreate';

export async function fileCreateFromTemplate(
	app: App,
	path: string,
	template: string
): Promise<TFile | null> {
	// Check if the file already exists
	const normalizedPath = normalizePath(path);
	const fileExists = app.vault.getAbstractFileByPath(normalizedPath);
	if (fileExists) {
		console.log(`File already exists at ${path}`);
		return null;
	}

	// Extract the folder path from the file path
	const folderPath = normalizedPath.split('/').slice(0, -1).join('/');
	// Create the folder if it doesn't exist
	if (folderPath) {
		await folderCreate(app, folderPath);
	}

	try {
		// Create the file with the template content
		const newFile = await this.app.vault.create(normalizedPath, template);
		const leaf = this.app.workspace.getLeaf();
		if (leaf) {
			await leaf.openFile(newFile);
			this.app.workspace.setActiveLeaf(leaf, true, true);
		}
		new Notice(`File created successfully at ${normalizedPath}`);
		return newFile;
	} catch (error) {
		new Notice(`Error creating file: ${path} - ${error.message}`);
		return null;
	}
}
