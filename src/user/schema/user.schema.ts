import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
	title: { type: String },
	email: { type: String },
	password: { type: String },
	firstName: { type: String },
	lastName: { type: String },
	gender: { type: String },
	game: { type: Array },
	sportName: { type: String },
	contact: { type: String },
	location: { type: String }

}, { timestamps: true })