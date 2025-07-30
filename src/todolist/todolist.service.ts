import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TodoListDto } from './todolist.dto';

@Injectable()
export class TodolistService {
    constructor(private prisma: PrismaService) { }

    async getTodosListByUser(userId: string) {
        const todos = await this.prisma.todoList.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        return todos;
    }

    async createTodo(userId: string, dto: TodoListDto) {
        return this.prisma.todoList.create({
            data: {
                userId,
                title: dto.title,
                text: dto.text,
                isCompleted: dto.isCompleted,
                endDate: dto.endDate ? new Date(dto.endDate) : undefined,
            },
        });
    }

    async deleteTodoById(userId: string, todoId: string): Promise<void> {
        const existingTask = await this.prisma.todoList.findFirst({
            where: {
                id: todoId,
                userId: userId,
            },
        });

        if (!existingTask) throw new BadRequestException({ message: 'Task not found or access denied' });


        await this.prisma.todoList.delete({
            where: { id: todoId },
        });
    }


    async updateCompleteTask(userId: string, todoId: string): Promise<TodoListDto> {
        const existingTask = await this.prisma.todoList.findFirst({
            where: {
                id: todoId,
                userId: userId,
            },
        });

        if (!existingTask) {
            throw new BadRequestException('Task not found or access denied');
        }

        const updatedTask = await this.prisma.todoList.update({
            where: { id: todoId },
            data: {
                isCompleted: !existingTask.isCompleted,
            },
        });

        return {
            title: updatedTask.title,
            text: updatedTask.text,
            isCompleted: updatedTask.isCompleted,
            endDate: updatedTask.endDate ?? undefined,
        };
    }

}
