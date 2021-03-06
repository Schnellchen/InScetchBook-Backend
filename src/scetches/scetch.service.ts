import { Injectable, BadRequestException } from '@nestjs/common';
import { ScetchRepository } from './scetch.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScetchDto } from './dto/create-scetch.dto';
import { Scetch } from './scetch.entity';
import { GetScetchFilterDto } from './dto/get-scetch-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ScetchesService {
    constructor (
        @InjectRepository(ScetchRepository)
        private scetchRepository: ScetchRepository) {
    }

    async createScetch(createScetchDto: CreateScetchDto, user: User, image: Express.Multer.File): Promise<Scetch>{
        // Проверка существует ли файл
        if (image === undefined){
            throw new BadRequestException(`File must not be empty!`);
        }
        return this.scetchRepository.createScetch(createScetchDto, user, image);
    }

    async getScetches(filterDto: GetScetchFilterDto): Promise<Scetch[]> {
        return this.scetchRepository.getScetches(filterDto);
    }

    async getScetchById(id: number): Promise<Scetch> {
        return this.scetchRepository.getScetchById(id);
    }

    async deleteScetch(id: number, user: User): Promise<void> {
        return this.scetchRepository.deleteScetch(id, user);
    }

}
