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
		const user = await this.userService.create(createUserDTO);
		const result = await this.userService.customerToken(user)
		return res.status(HttpStatus.OK).json({
			message: "success",
			result,
			user
		})
	}

	@Post('/login')
	async login(@Res() res, @Body() body) {
		const user = await this.userService.login(body);
		const result = await this.userService.customerToken(user)
		return res.status(HttpStatus.OK).json({
			message: "success",
			result,
			user
		})

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


	@Get('findOwnData')
	async findOwnData(@Res() res, @Req() req) {
		const user = await this.userService.find(req.user.id);
		if (!user) throw new NotFoundException('User does not exist!');
		return res.status(HttpStatus.OK).json(user);
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

}