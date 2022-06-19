import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user.interface';
import { CreateUserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
	constructor(@InjectModel('User') private readonly userModel: Model<User>, private jwtService: JwtService) { }

	// find by ID
	async find(id) {
		const user = await this.userModel.findOne({ _id: id });
		return user;
	}

	async allUsers() {
		const users = await this.userModel.find({  });
		return users;
	}

	// create user
	async create(createUserDTO: CreateUserDTO): Promise<User> {
		const { email, password, ...data } = createUserDTO;
		let user:any = await this.userModel.findOne({ email: email }).exec();
		if (!user) {
			if (password) {
				const hashPassword = await bcrypt.hash(password, 12);
				createUserDTO = { ...data, email, password: hashPassword }
				const newUser = await new this.userModel(createUserDTO);
				return newUser.save();
			}
			const newUser = await new this.userModel(createUserDTO);
			return newUser.save();
		}
		if(user.firstName === null){
			user = await this.update(user._id.toString(),createUserDTO)
			
		}
		return user
	}
	// edit user details
	async update(userID, createUserDTO: CreateUserDTO): Promise<User> {
		const updatedUser = await this.userModel.findByIdAndUpdate(userID, createUserDTO, { new: true });
		
		return updatedUser;
	}
	// delete user
	async delete(userID): Promise<any> {
		const deletedUser = await this.userModel.findByIdAndRemove(userID, { new: true });
		return deletedUser;
	}

	// jwt token generate
	public async customerToken(user) {
		const jwt = this.jwtService.sign({ email: user.email, sub: user._id})
		return {
			access_token: jwt,
		}
	}

	async login(body): Promise<any> {
		const user = await this.userModel.findOne({ email: body.email }).exec();
		if (await bcrypt.compare(body.password, user.password)) {
			return user;
		}
		else {
			return { login: false }
		}
	}
}
