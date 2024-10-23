import { Test, TestingModule } from '@nestjs/testing';
import { VotesService } from './votes.service';
import { VoteRepository } from './votes.repository';


const MockVoteRepository = () => ({
  createV: jest.fn(),
  deleteV: jest.fn(),
  countV: jest.fn()
})

describe('VotesService', () => {
  let service: VotesService;
  let vrepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotesService,
        {
          provide: VoteRepository,
          useFactory: MockVoteRepository
        }
      ],
    }).compile();

    service = await module.resolve(VotesService);
    vrepo = await module.resolve(VoteRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
