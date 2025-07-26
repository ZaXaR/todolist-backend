import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import * as bycript from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private userService: UserService
    ) { }

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto);
        const token = this.issueToken(user.id);

        return {
            user: {
                id: user.id,
                email: user.email
            },
            access_token: token,
        }
    }

    async register(dto: AuthDto) {
        const existingUser = await this.userService.findByEmail(dto.email);
        if (existingUser) throw new BadRequestException('User already exists');

        const hashedPassword = await bycript.hash(dto.password, 10);
        const user = await this.userService.create({
            email: dto.email,
            password: hashedPassword
        });

        const token = this.issueToken(user.id);

        return {
            user: {
                id: user.id,
                email: user.email
            },
            access_token: token,
        }
    }

    private issueToken(userId: string) {
        return this.jwt.sign({ id: userId }, { expiresIn: '1h' });
    }

    private async validateUser(dto: AuthDto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) throw new NotFoundException('User not found');

        const isValid = await bycript.compare(dto.password, user.password);
        if (!isValid) throw new NotFoundException('Invalid credentials');

        return user;
    }

}
