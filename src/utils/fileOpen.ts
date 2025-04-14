import { TFile } from 'obsidian';

/**
 * Open file in active workspace leaf.
 * @param filePath - File to open by path.
 * @param sourcePath - Where to search for. Use "" as the second argument for the root.
 */
export async function fileOpenByPath(
	filePath: string,
	sourcePath: string = ''
): Promise<void> {
	let file: TFile | null = this.app.metadataCache.getFirstLinkpathDest(
		filePath,
		sourcePath
	);

	if (!file) {
		console.error(`File not found: ${filePath}`);
		return;
	}

	const leaf = this.app.workspace.getLeaf(false);
	await leaf.openFile(file, { active: true });
}
