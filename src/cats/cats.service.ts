import { Get, Injectable, Logger, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Partial<Cat> & Cat | string> {
    const cat: Partial<Cat> = {
      name: createCatDto.name,
      age: createCatDto.age,
      breed: createCatDto.breed
    };

    try {
      const res = await this.catsRepository.save(cat);
      return res;
    } catch (error) {
      Logger.log(error);
      return error;
    }
  }

  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }


  async findOne(@Param('id') id: number): Promise<Cat> {
    return this.catsRepository.findOneBy({ id: id });
  }

  async update(@Param('id') id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const cat = await this.catsRepository.update(id, updateCatDto);
    return this.catsRepository.findOneBy({ id })
  }

  async remove(id: number): Promise<any> {
    const res = await this.catsRepository.delete({ id });
    return res;
  }
}
