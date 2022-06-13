import { Document } from "mongoose";

export interface User extends Document {
	readonly title: string;
	readonly email: string;
	readonly password: string;
	readonly firstName: string;
	readonly lastName: string;
	readonly gender: string;
}
