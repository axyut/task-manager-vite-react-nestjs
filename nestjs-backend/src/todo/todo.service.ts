import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
    private userService: UserService,
  ) {}

  async create(createTodo: CreateTodoDto, userId: number) {
    let todo: Todo = new Todo();
    todo.title = createTodo.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userService.findUserById(userId);
    return this.todoRepo.save(todo);
  }

  findAllTodoByUserNotCompleted(userId: number) {
    // all not completed todos

    return this.todoRepo.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  findAllTodoByUserCompleted(userId: number) {
    // all completed todos

    return this.todoRepo.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }

  update(todoId: number) {
    return this.todoRepo.update({ id: todoId }, { completed: true });
  }

  remove(todoId: number) {
    return this.todoRepo.delete(todoId);
  }
}
