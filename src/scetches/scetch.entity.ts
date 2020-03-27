import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/auth/user.entity";

@Entity() // Помечает класс как сущность для создания таблицы в БД
export class Scetch extends BaseEntity {
    @PrimaryGeneratedColumn() // Колонка первичного ключа?
    id: number;

    @Column() // Помечает свойство класса как колонку в таблице
    title: string;

    @Column()
    description: string;

    @ManyToOne(type => User, user => user.scetches, {eager: false})
    user: User;

    // Нужно для обращения к id пользователя т.к. оно не задается явно, а задается отношением сверху
    @Column()
    userId: number;
}