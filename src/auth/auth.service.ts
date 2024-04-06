import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = (await this.usersService.findAll()).find(user => user.email === email);

    if(user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { 
      userId: user.id, 
      email: user.email, 
      firstName: user.firstName, 
      lastName: user.lastName, 
      role: user.role 
    };

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }



  async signUp(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User> {
    const createUserDto: CreateUserDto = {
      email,
      firstName,
      lastName,
      password,
      role: false
    };

    try {
      const res = await this.usersService.create(createUserDto);
      return res;
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException();
    }
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
