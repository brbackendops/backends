import { DataSource, Repository } from 'typeorm';
import { Vote } from './votes.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { VoteBody } from './dtos/vote.dto';

@Injectable()
export class VoteRepository extends Repository<Vote> {
  constructor(private dataSource: DataSource) {
    super(Vote, dataSource.createEntityManager());
  }

  async createV(payload: object): Promise<string> {
    try {
      const vote = this.create(payload);
      await this.save(vote);
      return 'vote is successfully created';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteV(payload: VoteBody): Promise<string> {
    try {
      const vote = await this.createQueryBuilder('votes')
        .where('votes.quotes_id = :quote_id', { quote_id: payload.quotes })
        .andWhere('votes.created_by = :user_id', { user_id: payload.created })
        .getOne();
      console.log(vote);
      if (!vote) {
        throw new NotFoundException('resource not found');
      }
      await this.remove(vote);
      return 'vote undo successfully';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async countV(quote_id: string): Promise<number> {
    try {
      const vCount = await this.createQueryBuilder('vote')
        .where('vote.quotes_id = :quote_id', { quote_id })
        .getCount();
      return vCount;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

/*

explain analyze select * , ( select count(*) from Public."vote" as v where q.id = v."quotesId" ) as votes 
from Public."quotes" as q
order by votes desc 
limit 4;

*/
