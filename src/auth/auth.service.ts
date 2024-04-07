import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = (await this.usersService.findAll()).find(user => user.email === email);
    if(user && user.password === password) {
      return user;
    }
    return null;
  }

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
}
