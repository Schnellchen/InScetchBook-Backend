import { Injectable } from '@nestjs/common';
import { ScetchRepository } from './scetch.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScetchDto } from './dto/create-scetch.dto';
import { Scetch } from './scetch.entity';
import { GetScetchFilterDto } from './dto/get-scetch-filter.dto';

@Injectable()
export class ScetchesService {
    constructor ( // Конструктор тк это класс и требует метод конструктора
        @InjectRepository(ScetchRepository)
        private scetchRepository: ScetchRepository) {
    }

    async createScetch(createScetchDto: CreateScetchDto): Promise<Scetch>{
        return this.scetchRepository.createScetch(createScetchDto);
    }

    async getScetches(filterDto: GetScetchFilterDto): Promise<Scetch[]> {
        return this.scetchRepository.getScetches(filterDto);
    }

    async getScetchById(id: number): Promise<Scetch> {
        return this.scetchRepository.getScetchById(id);
    }

    async deleteScetch(id: number): Promise<void> {
        return this.scetchRepository.deleteScetch(id);
    }

}
