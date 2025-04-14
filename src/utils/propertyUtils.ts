import { TFile } from 'obsidian';

import { TNoteFile } from 'ui/components/NoteHero';

export function propertyAsFileLink(file: TFile) {
	return `${file.path}|${file.name}`;
}

/**
 * Compares note files by "sequence" property
 * @param a - Note file with frontmatter
 * @param b - Note file with frontmatter
 */
export function compareFileSequence(a: TNoteFile, b: TNoteFile) {
	return a.sequence.localeCompare(b.sequence, undefined, {
		numeric: true,
		sensitivity: 'base',
	});
}
