import { App, TFile } from 'obsidian';

//TODO: Refactoring
export function fileFromLinkGet(app: App, link: string): TFile | null {
	if (!link) return null;
	const match = link.match(/^\[\[(.*?)\]\]$/);
	if (!match) return null;

	// const [filePath, heading] = linkPath.split('|');
	const linkPath = match[1].split('|')[0];
	return app.metadataCache.getFirstLinkpathDest(linkPath, '/');
}
