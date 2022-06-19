import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './interface/team.interface';
import { CreateTeamDTO } from './dto/team.dto';

@Injectable()
export class TeamService {
	constructor(@InjectModel('Team') private readonly teamModel: Model<Team>) { }

	// find by ID
	async find(id) {
		const team = await this.teamModel.findOne({ _id: id });
		return team;
	}

	async allTeams() {
		const teams = await this.teamModel.find({  });
		return teams;
	}


	// create team
	async create(createTeamDTO: CreateTeamDTO): Promise<Team> {
		const { name } = createTeamDTO;
		let team:any = await this.teamModel.findOne({ name:name }).exec();
		if (!team) {
			const newTeam = await new this.teamModel(createTeamDTO);
			return newTeam.save();
		}
		return team;
	}

	// edit team details
	async update(teamID, createTeamDTO: CreateTeamDTO): Promise<Team> {
		const updatedTeam = await this.teamModel.findByIdAndUpdate(teamID, createTeamDTO, { new: true });
		
		return updatedTeam;
	}
	// delete team
	async delete(teamID): Promise<any> {
		const deletedTeam = await this.teamModel.findByIdAndRemove(teamID, { new: true });
		return deletedTeam;
	}
}
