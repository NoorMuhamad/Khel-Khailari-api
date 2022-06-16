import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema({
	name: { type: String },
	owner: { type: String },
	coach: { type: String }

}, { timestamps: true })