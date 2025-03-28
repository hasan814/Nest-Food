import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

}
