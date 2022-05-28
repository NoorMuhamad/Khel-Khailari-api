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
	// fetch all user
	async users(payload): Promise<any> {
		const page = (payload.page ? (payload.page - 1) : 0);
		const limit = payload.limit || 20;
		const active = payload.active || "_id"
		const sort = (payload.direction == "desc" ? "-1" : "1") || "1"
		let conditions = { role: payload.role.toString() }
		if (payload.search) {
			conditions['$or'] = [
				{ email: new RegExp(payload.search.toString(), 'i') },
				{ displayName: new RegExp(payload.search.toString(), 'i') },
				{ firstName: new RegExp(payload.search.toString(), 'i') },
				{ lastName: new RegExp(payload.search.toString(), 'i') }
			]
		}
		const records = await this.userModel.find(conditions).skip(page * limit).limit(limit).sort({ [active]: sort });
		const count = await this.userModel.find(conditions).count();
		return { status: "success", data: { records, count } }
	}

	// find by ID
	async find(id) {
		const user = await this.userModel.findOne({ _id: id });
		return user;
	}

	async allUsers() {
		const users = await this.userModel.find({  });
		return users;
	}

	async findByPayload(payload) {
		const user = await this.userModel.findOne(payload);
		return user;
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
	// find by email  
	async findByEmail(email): Promise<any> {
		const user = await this.userModel.findOne({ email }).exec();
		return user;
	}

	async updateUserByPayload(payload, userId): Promise<any> {
		const updatedUser = await this.userModel.findByIdAndUpdate(userId, payload, { new: true });
		return updatedUser;
	}

	// jwt token generate
	public async customerToken(user) {
		const jwt = this.jwtService.sign({ email: user.email, sub: user._id, subscription: user.activePackageId? true : false })
		return {
			access_token: jwt,
		}
	}

	async getUserCounts() {
		const userCount = await this.userModel.count( {role: 'customer'})
		const activeUserCount = await this.userModel.count({ isDeleted: false, role: 'customer' })
		const deletedUserCount = await this.userModel.count({ isDeleted: true, role: 'customer' })
		const subscribedUserCount = await this.userModel.count({ isDeleted: false, role: 'customer', activePackageId: {$ne: null } })

		var currentDate = new Date();
		currentDate.setDate(currentDate.getDate() - 7);
		const weeklyUserCount = await this.userModel.count({createdAt: { $gte: currentDate.toISOString() }, role: 'customer' })
		const weeklyActiveUserCount = await this.userModel.count({updatedAt: { $gte: currentDate.toISOString() }, isDeleted: false, role: 'customer'  })
		const weeklyDeletedUserCount = await this.userModel.count({ isDeleted: true, updatedAt: { $gte: currentDate.toISOString() }, role: 'customer'  })
		const weeklySubscribedUserCount = await this.userModel.count({ isDeleted: false, updatedAt: { $gte: currentDate.toISOString() }, role: 'customer', activePackageId: {$ne: null } })

		const countDetails = {
			userCount,
			activeUserCount,
			deletedUserCount,
			subscribedUserCount,
			weeklyUserCount,
			weeklyActiveUserCount,
			weeklyDeletedUserCount,
			weeklySubscribedUserCount
		}

		return countDetails
	}

}

