import { MarkdownView, TFile } from 'obsidian';

// TODO: Refactoring and Usage
async function fileOpenByPath(
	filePath: string,
	sourcePath: string = ''
): Promise<void> {
	let file: TFile | null = this.app.metadataCache.getFirstLinkpathDest(
		filePath,
		sourcePath // Use "" as the second argument for the root
	);

	if (!file) {
		console.error(`File not found: ${filePath}`);
		return;
	}

	const view = this.app.workspace.getActiveViewOfType(MarkdownView);
	if (view) {
		await view.openFile(file, { active: true });
	}
}
