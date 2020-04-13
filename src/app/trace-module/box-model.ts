export interface BoxModel {
	id: string;
	name: string;
	freeFibers: number;
	// number: number;
	splitter: number;
	users: [];
	nextBoxes: string[];
	parentBox?: string;
	positionLeft: number;
	positionTop: number;
}
