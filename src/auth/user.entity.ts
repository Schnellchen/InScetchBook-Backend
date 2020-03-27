import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm";
import * as bcrypt from "bcrypt";
import { Scetch } from "src/scetches/scetch.entity";

@Entity()
@Unique(['login']) 
@Unique(['email']) 
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Scetch, scetch => scetch.user, {eager: true})
    scetches: Scetch[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}