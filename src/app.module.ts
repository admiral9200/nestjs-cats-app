import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';
import { configService } from './config/config.service';


@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CoreModule, 
    CatsModule, 
    UsersModule, 
    AuthModule, 
    FavoritesModule
  ],
})
export class AppModule {}
