import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from './interface/player.interface';
import { CreatePlayerDTO } from './dto/player.dto';

@Injectable()
export class PlayerService {
	constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) { }

	// find by ID
	async find(id) {
		const player = await this.playerModel.findOne({ _id: id });
		return player;
	}

	async allPlayers() {
		const players = await this.playerModel.find({});
		return players;
	}


	// create Player
	async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {

		const newPlayer = await new this.playerModel(createPlayerDTO);
		return newPlayer.save();

	}

	// edit player details
	async update(playerID, createPlayerDTO: CreatePlayerDTO): Promise<Player> {
		const updatedPlayer = await this.playerModel.findByIdAndUpdate(playerID, createPlayerDTO, { new: true });

		return updatedPlayer;
	}
	// delete player
	async delete(playerID): Promise<any> {
		const deletedPlayer = await this.playerModel.findByIdAndRemove(playerID, { new: true });
		return deletedPlayer;
	}
}
