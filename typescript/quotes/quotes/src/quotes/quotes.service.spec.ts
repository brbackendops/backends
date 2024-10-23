import { Test, TestingModule } from '@nestjs/testing';
import { QuotesService } from './quotes.service';
import { QuotesResposioty } from './quotes.reposiotry';

const MockQuoteService = () => ({
  createQuotes: jest.fn(),
  updateQuote: jest.fn(),
  getQuote: jest.fn(),
  getAllQuotes: jest.fn(),
  deleteQuotes: jest.fn(),
  quotesFeed: jest.fn(),
})


describe('QuotesService', () => {
  let service: QuotesService;
  let qrepo;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuotesService,
        {
          provide: QuotesResposioty,
          useFactory: MockQuoteService
        }
      ],
    }).compile();

    service = await module.resolve(QuotesService);
    qrepo = await module.resolve(QuotesResposioty)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
