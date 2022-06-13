import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
	title: { type: String },
	email: { type: String },
	password: { type: String },
	firstName: { type: String },
	lastName: { type: String },
	gender: { type: String }

}, { timestamps: true })