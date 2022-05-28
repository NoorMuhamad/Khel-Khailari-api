import { Controller, Get, Res, HttpStatus, Post, Body, Put, NotFoundException, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
	constructor(
		private userService: UserService,

	) { }

	// Add users
	@Post('/create')
	async create(@Res() res, @Body() createUserDTO: any) {
		const payload = {
			...createUserDTO,
			displayName: createUserDTO.name,
			photoURL: createUserDTO.photoUrl,
		}
		const user = await this.userService.create(payload);
		const result = await this.userService.customerToken(user)
		return res.status(HttpStatus.OK).json({
			message: "success",
			result,
			user
		})
	}
	// users list
	@Post('users')
	async users(@Res() res, @Body() payload) {
		const users = await this.userService.users(payload);
		return res.status(HttpStatus.OK).json(users);
	}

	@Get('allUsers')
	async allUsers(@Res() res) {
		const allUsers = await this.userService.allUsers();
		return res.status(HttpStatus.OK).json(allUsers);
	}

	// Fetch a particular user
	@Get('find/:id')
	async find(@Res() res, @Param('id') id: string) {
		const user = await this.userService.find(id);
		if (!user) throw new NotFoundException('User does not exist!');
		return res.status(HttpStatus.OK).json(user);
	}
	@Post('findByPaylaod')
	async findByPaylaod(@Res() res, @Body() body, @Req() req) {
		const payload = {
			...body,
			userId: req.user.id
		}
		const user = await this.userService.findByPayload(payload);
		const token = await this.userService.customerToken(user)
		return res.status(HttpStatus.OK).json({ user, token });
	}


	@Get('findOwnData')
	async findOwnData(@Res() res, @Req() req) {
		const user = await this.userService.find(req.user.id);
		if (!user) throw new NotFoundException('User does not exist!');
		return res.status(HttpStatus.OK).json(user);
	}


	@Get('getRoomName')
	async findRoomName(@Res() res, @Req() req) {
		const roomName = 'connection_' + req.user.id
		return res.status(HttpStatus.OK).json(roomName);
	}


	@Put('updateUserByPayload')
	async updateUserByPayload(@Res() res, @Req() req, @Body() body) {
		const user = await this.userService.updateUserByPayload(body, req.user.id);
		if (!user) throw new NotFoundException('user does not exist!');
		return res.status(HttpStatus.OK).json({
			message: "success",
			user
		});
	}

	@Put('update/:id')
	async update(@Res() res, @Param('id') id: string, @Body() createUserDTO: CreateUserDTO) {
		const user = await this.userService.update(id, createUserDTO);
		if (!user) throw new NotFoundException('user does not exist!');
		return res.status(HttpStatus.OK).json({
			message: "success",
			user
		});
	}


	@Put('updateOwnData')
	async updateOwnData(@Res() res, @Req() req, @Body() createUserDTO: CreateUserDTO) {
		const user = await this.userService.update(req.user.id, createUserDTO);
		if (!user) throw new NotFoundException('user does not exist!');
		return res.status(HttpStatus.OK).json({
			message: "success",
			user
		});
	}

	// Delete a user
	@Delete('delete/:id')
	async delete(@Res() res, @Param('id') id: string) {
		const user = await this.userService.delete(id);
		if (!user) throw new NotFoundException('user does not exist');
		return res.status(HttpStatus.OK).json({
			message: "success",
			user
		})
	}

	// get count details
	@Get('countDetails')
	async countDetails(@Res() res) {
		const userCountDetails = await this.userService.getUserCounts()
		return res.status(HttpStatus.OK).json({
			message: "success",
			userCountDetails
		})
	}
}