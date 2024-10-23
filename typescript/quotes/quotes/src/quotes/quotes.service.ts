import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuotesResposioty } from './quotes.reposiotry';
import { QuotesBody, QuotesUpdate } from './dtos/quotes-dto';
import {
  QuotesResponseData,
  QuotesResponseNormal,
} from './response/quotes-response';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(QuotesResposioty)
    private quoterepo: QuotesResposioty,
  ) {}

  async createQuotes(
    payload: QuotesBody,
    user_id: string,
  ): Promise<QuotesResponseNormal> {
    try {
      const body = { ...payload, created_by: user_id };
      const msg = await this.quoterepo.createQ(body);
      return new QuotesResponseNormal('success', msg);
    } catch (error) {
      throw error;
    }
  }

  async updateQuote(
    id: string,
    payload: QuotesUpdate,
  ): Promise<QuotesResponseNormal> {
    try {
      const msg = await this.quoterepo.updateQ(id, payload);
      return new QuotesResponseNormal('success', msg);
    } catch (error) {
      throw error;
    }
  }

  async getQuote(id: string): Promise<QuotesResponseData> {
    try {
      const quote = await this.quoterepo.getSingle(id);
      return new QuotesResponseData('success', {
        data: quote,
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllQuotes(user_id: string): Promise<QuotesResponseData> {
    try {
      const quotes = await this.quoterepo.getAllQuotes(user_id);
      return new QuotesResponseData('status', {
        data: quotes,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteQuotes(id: string): Promise<QuotesResponseNormal> {
    try {
      const msg = await this.quoterepo.deleteQ(id);
      return new QuotesResponseNormal('status', msg);
    } catch (error) {
      throw error;
    }
  }

  async quotesFeed(query: number, url:string): Promise<QuotesResponseData> {
    try {
      const next: number = query + 1
      const prev: number = query - 1
      const data = await this.quoterepo.getQuotesForFeed(query,next,prev,url)
      return new QuotesResponseData("success",{
        "count": data.count,
        "next": data.next,
        "prev": data.prev,
        "data": data.quotes,
      })
    } catch (error) {
      throw error
    }
  }
}
