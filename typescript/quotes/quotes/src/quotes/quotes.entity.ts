import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Injectable()
@Entity()
export class Quotes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  content: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  created_by: User;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
