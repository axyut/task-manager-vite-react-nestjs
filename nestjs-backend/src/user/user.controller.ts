import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from '../utils/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // These endpoints for ADMIN Only!
  @Get()
  @UseGuards(new RoleGuard(Constants.ROLES.root))
  findAll(@Req() req) {
    return this.userService.findAll();
  }

  @Delete(':id')
  @UseGuards(new RoleGuard(Constants.ROLES.root))
  remove(@Param('id') id: string, @Req() req) {
    return this.userService.remove(+id);
  }
}
