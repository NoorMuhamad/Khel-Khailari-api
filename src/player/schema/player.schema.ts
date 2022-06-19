import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
	userId:{type: String},
	teamId: {type: String}
}, { timestamps: true })