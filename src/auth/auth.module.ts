import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '1h' }
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard
    // },
    AuthService,
    JwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // }
  ],
  exports: [JwtModule]
})
export class AuthModule {}
