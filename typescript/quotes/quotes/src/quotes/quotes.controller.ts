import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import {
  QuotesResponseData,
  QuotesResponseNormal,
} from './response/quotes-response';
import { QuotesBody, QuotesUpdate } from './dtos/quotes-dto';
import { Request } from 'express';
import { OwnerOnly } from './guard/owner.guard';

@Controller('quotes')
export class QuotesController {
  constructor(private qservice: QuotesService) {}

  @Get(':id')
  @HttpCode(200)
  async getQuoteHandler(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<QuotesResponseData> {
    try {
      return await this.qservice.getQuote(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('/get/feeds')
  @HttpCode(200)
  async quoteFeedHandler(
    @Query('page') page: number,
    @Req() req: Request,
  ): Promise<QuotesResponseData> {
    try {
      if (page === undefined || page === null) page = 0;
      const path = req.path;
      const host = req.hostname;
      const proto = req.protocol;
      const url = `${proto}://${host}${path}`;
      return await this.qservice.quotesFeed(page, url);
    } catch (error) {
      throw error;
    }
  }

  @Post('/create')
  @HttpCode(201)
  async createQuotehandler(
    @Body() payload: QuotesBody,
    @Req() req: Request,
  ): Promise<QuotesResponseNormal> {
    try {
      return await this.qservice.createQuotes(payload, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id/update')
  @HttpCode(200)
  @UseGuards(OwnerOnly)
  async updateQouteHandler(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() payload: QuotesUpdate,
  ): Promise<QuotesResponseNormal> {
    try {
      return await this.qservice.updateQuote(id, payload);
    } catch (error) {
      throw error;
    }
  }

  @Get('/own/quotes')
  @HttpCode(200)
  async getAllQuoteHandler(@Req() req: Request): Promise<QuotesResponseData> {
    try {
      return await this.qservice.getAllQuotes(req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id/delete')
  @HttpCode(200)
  @UseGuards(OwnerOnly)
  async deleteQuotehandler(
    @Req() req: Request,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<QuotesResponseNormal> {
    try {
      return await this.qservice.deleteQuotes(id);
    } catch (error) {
      throw error;
    }
  }
}
