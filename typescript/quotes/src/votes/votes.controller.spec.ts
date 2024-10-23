import { Test, TestingModule } from '@nestjs/testing';
import { VotesController } from './votes.controller';
import { Vote } from './votes.entity';
import { VotesService } from './votes.service';
import { VoteRepository } from './votes.repository';


const MockVoteRepository = () => ({
  createV: jest.fn(),
  deleteV: jest.fn(),
  countV: jest.fn()
});

const MockVoteService = () => ({
  createVote: jest.fn(),
  undoVote: jest.fn(),
  countVote: jest.fn(),
})

describe('VotesController', () => {
  let controller: VotesController;
  let vservice;
  let vrepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotesController],
      providers:[
        {
          provide: VotesService,
          useFactory: MockVoteService
        },
        {
          provide: VoteRepository,
          useFactory: MockVoteRepository
        }
      ]
    }).compile();

    controller = await module.resolve(VotesController);
    vservice = await module.resolve(VotesService)
    vrepo = await module.resolve(VoteRepository)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
