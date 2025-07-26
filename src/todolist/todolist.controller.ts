import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CurrentUser } from 'src/auth/decorators/user-decorator';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) { }

  @HttpCode(200)
  @Get()
  async getTodosListByUser(@CurrentUser('id') id: string) {
    return this.todolistService.getTodosListByUser(id);
  }
}
