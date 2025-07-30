import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from 'src/todolist/todolist.dto';
import * as bycript from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {
    }

    async create(dto: AuthDto) {
        const hashedPassword = await bycript.hash(dto.password, 10);
        
        return this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
            }
        });
    }

    async update(id: string, dto: Partial<UserDto>) {
        let data = dto as UserDto;

        if (dto.password) {
            data.password = await bycript.hash(dto.password, 10);
        }

        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async getById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) return null;

        const { password, ...safeUser } = user;

        return safeUser;
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
}
