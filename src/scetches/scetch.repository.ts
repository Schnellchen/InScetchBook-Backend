import { Repository, EntityRepository } from "typeorm";
import { Scetch } from "./scetch.entity";
import { User } from "src/auth/user.entity";
import { CreateScetchDto } from "./dto/create-scetch.dto";
import { GetScetchFilterDto } from "./dto/get-scetch-filter.dto";
import { NotFoundException, BadRequestException, } from "@nestjs/common";

@EntityRepository(Scetch)
export class ScetchRepository extends Repository<Scetch> { 
    
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

    async getScetches(filterDto: GetScetchFilterDto): Promise<Scetch[]> {
        const { search, range, offset, userId } = filterDto;
        const query = this.createQueryBuilder('scetch'); 
        
        if (search) {
            query.andWhere('(scetch.title LIKE :search OR scetch.description LIKE :search)', {search: `%${search}%`}); 
        }

        // Это?
        if (range) {
            let start = +range.split("-")[0];
            let end = +range.split("-")[1];
            console.log(start,end);
            if (isNaN(start) || isNaN(end) || start === 0 || end === 0){
                throw new BadRequestException(`Incorrect search criteria`);
            } else if (start > end){
                let buf = end;
                end = start;
                start = buf;
            }
            
            query.andWhere('(scetch.id >= :start AND scetch.id <= :end)', {start: `${start}`, end: `${end}`});
        }

        if (userId){
            query.andWhere(('scetch.userId = :userId'), {userId: `${userId}`});
        }

        // Или это? Не добавляет условие в запрос как andWhere
        if (offset) {
            query.skip(offset).take();
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
        const result = await this.delete({id, userId: user.id}); 
        if (result.affected === 0) {
        throw new NotFoundException(`There is no scetch with id: "${id}"!`);
       }
    }
}