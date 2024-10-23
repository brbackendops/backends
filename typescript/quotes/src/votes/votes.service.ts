import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteRepository } from './votes.repository';
import { VoteResponseData, VoteResponseNormal } from './response/vote.reposne';
import { VoteBody } from './dtos/vote.dto';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(VoteRepository)
    private vrepo: VoteRepository,
  ) {}

  async createVote(payload: VoteBody): Promise<VoteResponseNormal> {
    try {
      const msg = await this.vrepo.createV(payload);
      return new VoteResponseNormal('success', msg);
    } catch (error) {
      throw error;
    }
  }

  async undoVote(payload: VoteBody): Promise<VoteResponseNormal> {
    try {
      const msg = await this.vrepo.deleteV(payload);
      return new VoteResponseNormal('success', msg);
    } catch (error) {
      throw error;
    }
  }

  async countVote(qid: string): Promise<VoteResponseData> {
    try {
      const vcount = await this.vrepo.countV(qid);
      return new VoteResponseData('success', {
        count: vcount,
      });
    } catch (error) {
      throw error;
    }
  }
}
