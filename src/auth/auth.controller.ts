import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * 
   * @param signInDto 
   * @returns 
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }


  /**
   * 
   * @param signUpDto 
   * @returns 
   */
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.signUp(
      signUpDto.email,
      signUpDto.firstName,
      signUpDto.lastName,
      signUpDto.password
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @Roles(['admin'])
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  findAll(@Request() req) {
    return req.user;
  }
}
