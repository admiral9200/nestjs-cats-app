import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Favorite } from './entities/favorite.entity';
import { User } from '../users/entities/user.entity';
import { Cat } from '../cats/entities/cat.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favRepositories: Repository<Favorite>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>
  ) { }


  async create(createFavoriteDto: CreateFavoriteDto): Promise<Partial<Favorite> & Favorite | string> {
    const userId = createFavoriteDto.user_id;
    const catId = createFavoriteDto.cat_id;

    const user = await this.usersRepository.findOneBy({ id: userId });
    const cat = await this.catsRepository.findOneBy({ id: catId });

    const favorite = new Favorite();
    favorite.user = user;
    favorite.cat = cat;

    const createdFav = await this.favRepositories.save(favorite);

    return createdFav;
  }

  async remove(userId: string, catId: string): Promise<DeleteResult> {
    const res = await this.favRepositories
      .createQueryBuilder()
      .delete()
      .where('userId=:userId', {userId})
      .andWhere('catId =:catId', {catId})
      .execute();

    return res;
  }
}
