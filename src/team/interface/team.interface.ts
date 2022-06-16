import { Document } from "mongoose";

export interface Team extends Document {
	readonly name: string;
	readonly owner: string;
	readonly coach: string;
}
