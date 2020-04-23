import { UserModel } from './user-details/user-model';

export interface BoxModel {
	id?: string;
	name: string;
	freeFibers: number;
	// number: number;
	splitter: number;
	// userDetails: { pon: string; name: string };
	users: { pon: string; name?: string; address?: string }[];
	nextBoxes: string[];
	parentBox?: string;
	positionLeft: number;
	positionTop: number;
}
