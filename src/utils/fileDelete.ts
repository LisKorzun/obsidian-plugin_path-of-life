import { App, TFile, Notice } from 'obsidian';

//TODO: Refactoring
export async function fileDelete(app: App, file: TFile) {
	try {
		// Confirmation Dialog before deletion (Highly recommended)
		const confirmed = await new Promise((resolve) => {
			const notice = new Notice(
				`Are you sure you want to delete "${file.name}"? This action cannot be undone.`,
				0 //Indefinite timeout, user must interact.
			);

			// Create confirm and cancel buttons
			const container = notice.noticeEl.createDiv('notice-actions');
			const confirmButton = container.createEl('button', { text: 'Confirm' });
			const cancelButton = container.createEl('button', { text: 'Cancel' });

			// Add click listeners
			confirmButton.addEventListener('click', () => {
				notice.hide();
				resolve(true);
			});

			cancelButton.addEventListener('click', () => {
				notice.hide();
				resolve(false);
			});
		});

		if (confirmed) {
			await app.vault.delete(file);
			new Notice(`File "${file.name}" deleted successfully.`);

			// After deleting, focus on another file if available.
			const files = app.vault.getMarkdownFiles();
			// if (files.length > 0) {
			// 	app.workspace.setActiveFile(files[0]); // Focus on the first file in the vault. You can modify this logic as needed.
			// }
		} else {
			new Notice('File deletion cancelled.');
		}
	} catch (error) {
		new Notice(`Error deleting file: ${error.message}`);
		console.error(`Error deleting file: ${error}`);
	}
}
