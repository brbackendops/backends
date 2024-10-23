import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { VoteResponseData, VoteResponseNormal } from './response/vote.reposne';
import { VoteBody } from './dtos/vote.dto';
import { Request } from 'express';

@Controller('votes')
export class VotesController {
  constructor(private vs: VotesService) {}

  @Post('/vote')
  @HttpCode(201)
  async createVoteHandler(
    @Body() payload: VoteBody,
    @Req() req: Request,
  ): Promise<VoteResponseNormal> {
    try {
      payload.created = req.user.id;
      return await this.vs.createVote(payload);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/undo')
  @HttpCode(200)
  async deleteVoteHandler(
    @Body() payload: VoteBody,
    @Req() req: Request,
  ): Promise<VoteResponseNormal> {
    try {
      payload.created = req.user.id;
      return await this.vs.undoVote(payload);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id/count')
  @HttpCode(200)
  async countVoteHandler(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<VoteResponseData> {
    try {
      return await this.vs.countVote(id);
    } catch (error) {
      throw error;
    }
  }
}
