import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { SignUpCredentialsDto } from "./dto/signup-credentials.dto";
import { SignInCredentialsDto } from "./dto/signin-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        const { login, password, email } = signUpCredentialsDto;

        const user = new User();
        user.salt = await bcrypt.genSalt();
        user.login = login;
        user.password = await this.hashPassword(password, user.salt);
        user.email = email;

        try {
            await user.save();
        } catch(e) {
            if (e.code === '23505') {
                throw new ConflictException('Логин или почта уже используется');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(signInCredentialsDto: SignInCredentialsDto): Promise<string> {
        const { login, password } = signInCredentialsDto;

        const user = await this.findOne({login});
        if (user && await user.validatePassword(password)){
        return user.login;
        } else {
            return null;
        }
    }
}