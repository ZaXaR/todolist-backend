import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TodolistController],
  providers: [TodolistService, PrismaService
  ],
})
export class TodolistModule { }
