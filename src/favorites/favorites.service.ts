import { Injectable, Logger } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favRepositories: Repository<Favorite>
  ) { }


  async create(createFavoriteDto: CreateFavoriteDto): Promise<Partial<Favorite> & Favorite | string> {
    const fav: Partial<Favorite> = {
      user_id: createFavoriteDto.user_id,
      cat_id: createFavoriteDto.cat_id
    };

    try {
      const res = await this.favRepositories.save(fav);
      return res;
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  async remove(userId: string, catId: string): Promise<DeleteResult> {
    const res = await this.favRepositories
      .createQueryBuilder()
      .delete()
      .where('user_id=:userId', {userId})
      .andWhere('cat_id = :catId', {catId})
      .execute();

    return res;
  }
}
