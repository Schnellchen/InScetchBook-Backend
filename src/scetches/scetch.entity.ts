import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/auth/user.entity";

@Entity() 
export class Scetch extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    imagePath: string;

    @ManyToOne(type => User, user => user.scetches, {eager: false})
    user: User;

    @Column()
    userId: number;
}