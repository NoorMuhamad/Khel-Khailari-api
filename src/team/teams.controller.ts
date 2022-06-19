import { Controller, Get, Res, HttpStatus, Post, Body, Put, NotFoundException, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { CreateTeamDTO } from './dto/team.dto';
import { TeamService } from './teams.service';

@Controller('team')
export class TeamController {
	constructor(
		private teamService: TeamService,

	) { }

	// Add teams
	@Post('/create')
	async create(@Res() res, @Body() CreateTeamDTO: any) {
		const team = await this.teamService.create(CreateTeamDTO);
		return res.status(HttpStatus.OK).json({
			message: "success",
			team
		})
	}


	@Get('allTeams')
	async allTeam(@Res() res) {
		const allTeams = await this.teamService.allTeams();
		return res.status(HttpStatus.OK).json(allTeams);
	}

	// Fetch a particular team
	@Get('find/:id')
	async find(@Res() res, @Param('id') id: string) {
		const team = await this.teamService.find(id);
		if (!team) throw new NotFoundException('User does not exist!');
		return res.status(HttpStatus.OK).json(team);
	}

	@Put('update/:id')
	async update(@Res() res, @Param('id') id: string, @Body() createTeamDTO: CreateTeamDTO) {
		const team = await this.teamService.update(id, createTeamDTO);
		if (!team) throw new NotFoundException('user does not exist!');
		return res.status(HttpStatus.OK).json({
			message: "success",
			team
		});
	}


	// Delete a team
	@Delete('delete/:id')
	async delete(@Res() res, @Param('id') id: string) {
		const team = await this.teamService.delete(id);
		if (!team) throw new NotFoundException('user does not exist');
		return res.status(HttpStatus.OK).json({
			message: "success",
			team
		})
	}

}