import { TFile } from 'obsidian';

export function propertyAsFileLink(file: TFile) {
	return `${file.path}|${file.name}`;
}
