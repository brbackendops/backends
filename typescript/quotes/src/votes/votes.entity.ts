import { Quotes } from '../quotes/quotes.entity';
import { User } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Quotes, (quote) => quote.id, {
    onDelete: 'CASCADE',
  })
  quotes: Quotes;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  created: User;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
