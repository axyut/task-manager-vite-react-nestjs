import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  // inject user repository  or use the repo folder  ( these are two methods)
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  create(createUser: CreateUserDto) {
    let user: User = new User();
    user.email = createUser.email;
    user.firstName = createUser.firstName;
    user.lastName = createUser.lastName;
    user.password = createUser.password;
    user.role = Constants.ROLES.normal; // default normal user

    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findUserByEmail(email: string) {
    return this.userRepo.findOne({ where: { email: email } });
  }

  remove(id: number) {
    // when a user is being deleted we also need to delete all the todos
    // associated with that user

    return this.userRepo.delete(id);
  }

  findUserById(id: number) {
    return this.userRepo.findOneOrFail({ where: { id: id } });
  }
}
