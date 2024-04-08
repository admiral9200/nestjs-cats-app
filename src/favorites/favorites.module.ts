import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { User } from '../users/entities/user.entity';
import { Cat } from '../cats/entities/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Cat])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
