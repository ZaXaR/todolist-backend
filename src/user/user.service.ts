import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from 'src/todolist/todolist.dto';
import * as bycript from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {
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

    async create(dto: AuthDto) {
        return this.prisma.user.create({
            data: {
                email: dto.email,
                password: dto.password,
            }
        });
    }

    getById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
}
