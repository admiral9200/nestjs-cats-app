import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';
import { IsInt } from 'class-validator';

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {
    // @IsInt()
    user_id?: number;

    // @IsInt()
    cat_id?: number;
}
