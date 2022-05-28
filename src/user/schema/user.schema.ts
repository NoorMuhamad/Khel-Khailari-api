import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
	email: { type: String }, //
	password: { type: String, default: null }, //
	firstName: { type: String }, //
	lastName: { type: String },//
	authToken: { type: String, default: null }, //
	idToken: { type: String, default: null }, //
	isDeleted: { type: Boolean, default: false }, //
	connected: { type: Boolean, default: true }, //
	displayName: { type: String },
	photoURL: { type: String },
	providerId: { type: String , default:'google.com'}, // 
	oldDbUserid: { type: String, default: null }, //
	createdAt: { type: String }, //
	updatedAt: { type: String }, //

}, { timestamps: true })