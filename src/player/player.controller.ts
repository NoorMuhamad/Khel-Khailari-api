import { Controller, Get, Res, HttpStatus, Post, Body, Put, NotFoundException, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/player.dto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
	constructor(
		private playerService: PlayerService,

	) { }

	// Add player
	@Post('/create')
	async create(@Res() res, @Body() CreatePlayerDTO: CreatePlayerDTO) {
		const player = await this.playerService.create(CreatePlayerDTO);
		return res.status(HttpStatus.OK).json({
			message: "success",
			player
		})
	}


	@Get('allPlayers')
	async allPlayer(@Res() res) {
		const allPlayers = await this.playerService.allPlayers();
		return res.status(HttpStatus.OK).json(allPlayers);
	}

	// Fetch a particular player
	@Get('find/:id')
	async find(@Res() res, @Param('id') id: string) {
		const player = await this.playerService.find(id);
		if (!player) throw new NotFoundException('User does not exist!');
		return res.status(HttpStatus.OK).json(player);
	}

	@Put('update/:id')
	async update(@Res() res, @Param('id') id: string, @Body() createPlayerDTO: CreatePlayerDTO) {
		const player = await this.playerService.update(id, createPlayerDTO);
		if (!player) throw new NotFoundException('user does not exist!');
		return res.status(HttpStatus.OK).json({
			message: "success",
			player
		});
	}


	// Delete a player
	@Delete('delete/:id')
	async delete(@Res() res, @Param('id') id: string) {
		const player = await this.playerService.delete(id);
		if (!player) throw new NotFoundException('user does not exist');
		return res.status(HttpStatus.OK).json({
			message: "success",
			player
		})
	}

}