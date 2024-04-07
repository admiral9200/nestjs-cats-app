import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  /**
   * 
   */
  async seedData(): Promise<void> {
    const users: Partial<User>[] = [
      { email: "admin@gmail.com", firstName: "admin", lastName: "admin", password: "123456", role: UserRole.Admin }
    ]

    try {
      await this.usersRepository.save(users);
      Logger.log("Users data seeded successfully!");
    } catch (error) {
      Logger.error(`Error seeding data: ${error.message}`, error.stack);
    }
  }


  async create(createUserDto: CreateUserDto): Promise<Partial<User> & User> {
    const user: Partial<User> = {
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      password: createUserDto.password,
      role: UserRole.User
    };
  
    try {
      const existedUser = (await this.findAll()).find(u => u.email === user.email);
      if(existedUser) {
        throw new ConflictException();
      }

      const res = await this.usersRepository.save(user);
      Logger.log("Signed up successfully!");
      return res;
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException();
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
