import { App, CachedMetadata, TFile } from 'obsidian';

/**
 * Get frontmatter of the file
 * @param app - The Obsidian App instance.
 * @param file - The file to get FrontMatter.
 */
export async function fileFrontMatterGet(
	app: App,
	file: TFile
): Promise<CachedMetadata['frontmatter'] | null> {
	return new Promise((resolve) => {
		app.fileManager.processFrontMatter(
			file,
			(frontmatter: CachedMetadata['frontmatter']) => {
				resolve(frontmatter);
			}
		);
	});
}
