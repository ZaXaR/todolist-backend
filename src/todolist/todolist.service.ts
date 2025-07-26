import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodolistService {
    constructor(private prisma: PrismaService) { }

    async getTodosListByUser(userId: string) {
        const todos = await this.prisma.todoList.findMany({
            where: { userId },
        });
        return todos;
    }
}
