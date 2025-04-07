export interface ViewAction {
	cta: string;
	tooltip: string;
	icon: string;
	cls?: string;
	onClick: (evt: MouseEvent) => void;
}
