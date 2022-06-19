import { Document } from "mongoose";

export interface Player extends Document {
	readonly teamId: string;
	readonly userID: string;
}
