import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService, 
    ) {}

    async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        return this.userRepository.signUp(signUpCredentialsDto);
    }

    async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<{accessToken: string}> {
        const login = await this.userRepository.validateUserPassword(signInCredentialsDto);
        
        if(!login ) {
            throw new UnauthorizedException("Неправильные данные!");
        } 

        const payload: JwtPayload = { login }; 
        const accessToken = await this.jwtService.sign(payload); 

        return { accessToken }; 
    }
}
