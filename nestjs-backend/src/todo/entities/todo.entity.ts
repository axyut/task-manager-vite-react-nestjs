import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  completed: boolean;

  // many todos to one user relation
  @ManyToOne(
    () => User,
    (user) => user.todos, // reverse relation happening with todos : Todo[]
  )
  user: User;
}
