import { DataSource, Repository } from 'typeorm';
import { Quotes } from './quotes.entity';
import { QuotesUpdate } from './dtos/quotes-dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Redirect,
} from '@nestjs/common';
import { UserReposioty } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuotesResposioty extends Repository<Quotes> {
  constructor(
    @InjectRepository(UserReposioty)
    private readonly userrepo: UserReposioty,
    private datasource: DataSource,
  ) {
    super(Quotes, datasource.createEntityManager());
  }

  async createQ(payload: object): Promise<string> {
    try {
      const quote = this.create(payload);
      await this.save(quote);
      return 'quote created successfully';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateQ(id: string, payload: QuotesUpdate): Promise<string> {
    try {
      const quote = await this.getSingle(id);
      if (payload.title === undefined) {
        payload.title = quote.title;
      }

      if (payload.content === undefined) {
        payload.content = quote.content;
      }

      quote.title = payload.title;
      quote.content = payload.content;
      await this.save(quote);
      return 'updated successfully';
    } catch (error) {
      throw error;
    }
  }

  async deleteQ(id: string): Promise<string> {
    try {
      const quote = await this.findOneBy({ id });
      if (!quote) {
        throw new NotFoundException('resource not found');
      }
      await this.remove(quote);
      return 'resource deleted successfully';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getSingle(id: string): Promise<Quotes> {
    try {
      const quote = await this.findOneBy({
        id,
      });
      if (!quote) {
        throw new NotFoundException('resource not found');
      }
      return quote;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllQuotes(id: string): Promise<Quotes[]> {
    try {
      const user = await this.userrepo.findOneBy({
        id,
      });

      const quotes = this.createQueryBuilder('quotes')
        .where('quotes.created_by = :created_by', { created_by: user.id })
        .cache(true)
        .getMany();
      return quotes;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getQuotesForFeed(q: number , next:number , prev: number, url:string): Promise<{ count: number, next: string , prev:string, quotes: Quotes[] }> {

    try {
      const offset = 4;
      const skip = q * offset;

      const count = await this.count()
      if ( next > count) {
        throw new Error("redirect")
      }

      let next_url = null
      let prev_url = null

      if ( skip > 0 ) {
         next_url = url + `?page=${q + 1}`
         prev_url = url + `?page=${q - 1}`
      }

      console.log(next_url)
      console.log(prev_url)
      const quotes = await this.find({
        take: 4,
        skip: skip,
      })

      return {
        count,
        next: next_url,
        prev: prev_url,
        quotes,
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
