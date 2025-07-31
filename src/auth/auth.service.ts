import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import * as bycript from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private userService: UserService
    ) { }

    EXPIRE_DAY_REFRESH_TOKEN = 1
    REFRESH_TOKEN = 'refreshToken'

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto);
        const tokens = this.issueToken(user.id);

        return {
            user: { id: user.id, email: user.email },
            ...tokens
        }
    }

    async register(dto: AuthDto) {
        const existingUser = await this.userService.findByEmail(dto.email);
        if (existingUser) throw new BadRequestException({ message: 'User already exists' });

        const user = await this.userService.create(dto);

        const tokens = this.issueToken(user.id);

        const { password, ...safeUser } = user;

        return {
            user: safeUser,
            ...tokens
        };
    }

    async refreshToken(refreshToken: string) {
        const payload = await this.jwt.verifyAsync(refreshToken);
        if (!payload) throw new UnauthorizedException('Invalid refresh token');

        const user = await this.userService.getById(payload.id);
        if (!user) throw new NotFoundException('User not found');

        const tokens = this.issueToken(user.id);

        return {
            user,
            ...tokens,
        };
    }

    async logOut(res: Response): Promise<boolean> {
        res.clearCookie(this.REFRESH_TOKEN, {
            httpOnly: true,
            domain: 'localhost',
            secure: true,
            sameSite: 'none',
        });

        return true;
    }

    async addRefreshTokenToResponse(res: Response, refreshToken: string) {
        const expiredIn = new Date();
        expiredIn.setDate(expiredIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)
        res.cookie(this.REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            domain: 'localhost',
            expires: expiredIn,
            secure: true,
            sameSite: 'none'
        })
    }

    private issueToken(userId: string) {
        const accessToken = this.jwt.sign({ id: userId }, { expiresIn: '1m' });
        const refreshToken = this.jwt.sign({ id: userId }, { expiresIn: '7d' });

        return {
            accessToken,
            refreshToken,
        };

    }

    private async validateUser(dto: AuthDto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) throw new NotFoundException('User not found');

        const isValid = await bycript.compare(dto.password, user.password);
        if (!isValid) throw new NotFoundException('Invalid credentials');

        return user;
    }

}
