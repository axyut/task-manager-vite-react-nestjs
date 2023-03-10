import { Todo } from 'src/todo/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  // one user can have multiple todos (one to many relation)
  @OneToMany(
    () => Todo,
    (todo: Todo) => todo.user, // reverse relation happening with user: User
  )
  todos: Todo[];
}
