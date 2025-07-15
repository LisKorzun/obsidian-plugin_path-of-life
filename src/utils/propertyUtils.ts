import { TFile } from 'obsidian';

import { THierarchicalNoteFile } from 'ui/components';

export function propertyAsFileLink(file: TFile) {
	return `${file.path}|${file.name}`;
}

/**
 * Compares note files by "sequence" property
 * @param a - Note file with frontmatter
 * @param b - Note file with frontmatter
 */
export function compareFileSequence(
	a: THierarchicalNoteFile,
	b: THierarchicalNoteFile
) {
	return a.sequence.localeCompare(b.sequence, undefined, {
		numeric: true,
		sensitivity: 'base',
	});
}
