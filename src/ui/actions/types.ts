export interface ViewAction {
	cta: string;
	tooltip: string;
	icon: string;
	onClick: (evt: MouseEvent) => void;
}
