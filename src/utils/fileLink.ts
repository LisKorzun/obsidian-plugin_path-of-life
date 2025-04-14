import { TFile } from 'obsidian';
import { fileOpenByPath } from './fileOpen';

/**
 * Returns link for the file as string for inner html property
 * @param file - The Obsidian File instance
 * @param cls - Additional classnames
 */
export function fileLinkHTMLGet(file: TFile, cls = '') {
	return `
    <a 
    data-tooltip-position="top"
	aria-label="${file.basename}"
    data-href="${file.path}" 
    href="${file.path}" 
    class="internal-link ${cls}" 
    target="_blank" 
    rel="noopener nofollow">
        ${file.basename}
    </a>\
        `;
}

/**
 * Renders link for the file to the container
 * @param container - HTMLElement to render the link
 * @param file - The Obsidian File instance
 * @param cls - Additional classnames
 */
export function fileLinkRenderer(
	container: HTMLElement,
	file: TFile,
	cls = ''
) {
	const link = container.createEl('a', {
		attr: {
			'data-tooltip-position': 'top',
			'aria-label': file.basename,
			'data-href': file.path,
			target: '_blank',
			rel: 'noopener nofollow',
		},
		href: file.path,
		cls: `internal-link ${cls}`,
		text: file.basename,
	});

	link.addEventListener('click', async () => {
		await fileOpenByPath(file.path, 'data/notes/mess');
	});

	return link;
}
