import { UserModel } from './users/user-model';

export interface BoxModel {
	id?: string;
	name: string;
	freeFibers: number;
	addInfo?: string;
	splitter: number;
	// userDetails: { pon: string; name: string };
	users: { pon: string; name?: string; address?: string }[];
	nextBoxes: string[];
	parentBox?: string;
	positionLeft: number;
	positionTop: number;
}
