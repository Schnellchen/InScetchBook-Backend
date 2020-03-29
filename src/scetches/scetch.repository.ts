import { Repository, EntityRepository } from "typeorm";
import { Scetch } from "./scetch.entity";
import { User } from "src/auth/user.entity";
import { CreateScetchDto } from "./dto/create-scetch.dto";
import { GetScetchFilterDto } from "./dto/get-scetch-filter.dto";
import { NotFoundException, } from "@nestjs/common";

@EntityRepository(Scetch) // Объявляет класс как репозиторий
export class ScetchRepository extends Repository<Scetch> { // Репозиторий предназначен для работы с сущностями
    
    async createScetch(createScetchDto: CreateScetchDto, user: User, image: Express.Multer.File): Promise<Scetch>{
        
        const { title, description } = createScetchDto;
        const scetch = new Scetch;

        scetch.title = title;
        scetch.description = description;
        scetch.imagePath = image.path;
        scetch.user = user;

        await scetch.save();
        delete scetch.user;
    
        return scetch;
    }

    async getAllScetches(filterDto: GetScetchFilterDto): Promise<Scetch[]> {
        const { search} = filterDto;
        const query = this.createQueryBuilder('scetch'); // Построение сложного запроса для БД. scetch - ключевое слово, ссылка на сущность
        
        if (search) {
            query.andWhere('(scetch.title LIKE :search OR scetch.description LIKE :search)', {search: `%${search}%`}); // lIKE почти как =, но позволяет частичное совпадение. %${} позволяет искать частичное совпадение
        }

        const scetches = await query.getMany();
        return scetches;
    }

    async getScetchById(id: number): Promise<Scetch>{
        const found = await this.findOne(id);

        if(!found){
            throw new NotFoundException(`There is no scetch with id: "${id}"!`);
        }

        return found;
    }

    async deleteScetch(id: number, user: User): Promise<void> {
        const result = await this.delete({id}); 
       
        if (result.affected === 0) {
        throw new NotFoundException(`There is no scetch with id: "${id}"!`);
       }
    }
}