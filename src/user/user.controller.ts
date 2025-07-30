import { Body, Controller, Get, HttpCode, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user-decorator';
import { Auth } from 'src/auth/decorators/auth-decorator';
import { UserDto } from 'src/todolist/todolist.dto';

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @Auth()
  async Profile(@CurrentUser('id') id: string) {
    return this.userService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async updateProfile(@CurrentUser('id') id: string, @Body() dto: Partial<UserDto>) {
    return this.userService.update(id, dto);
  }
}
