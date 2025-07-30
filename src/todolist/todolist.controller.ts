import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CurrentUser } from 'src/auth/decorators/user-decorator';
import { Auth } from 'src/auth/decorators/auth-decorator';
import { TodoListDto } from './todolist.dto';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) { }

  @HttpCode(200)
  @Get()
  @Auth()
  async getTodosListByUser(@CurrentUser('id') id: string) {
    return this.todolistService.getTodosListByUser(id);
  }

  @HttpCode(201)
  @Post()
  @Auth()
  async createTodoListByUser(
    @CurrentUser('id') id: string,
    @Body() dto: TodoListDto
  ) {
    return this.todolistService.createTodo(id, dto);
  }

  @Delete(':todoId')
  @Auth()
  async deleteTodosById(
    @CurrentUser('id') id: string,
    @Param("todoId") todoId: string
  ) {
    return this.todolistService.deleteTodoById(id, todoId);
  }

  @Put(':todoId')
  @Auth()
  async updateComplateTask(
    @CurrentUser('id') id: string,
    @Param('todoId') todoId: string
  ) {
    return this.todolistService.updateCompleteTask(id, todoId);
  }
}