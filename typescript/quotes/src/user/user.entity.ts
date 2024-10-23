import { Injectable } from '@nestjs/common';
import { PrimaryGeneratedColumn, Column, Entity, BeforeInsert } from 'typeorm';

@Injectable()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column()
  photo: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @BeforeInsert()
  setPhoto() {
    if (!this.photo) {
      this.photo = `https://ui-avatars.com/api/?name=${this.name}`;
    }
  }
}
