// This file exists to let typeorm know about the entity
// you don't need this folder or file at present becuase entity repo is already used in user service by making there
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
