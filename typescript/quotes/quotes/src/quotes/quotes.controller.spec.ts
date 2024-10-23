import { Test, TestingModule } from '@nestjs/testing';
import { QuotesController } from './quotes.controller';
import { QuotesResposioty } from './quotes.reposiotry';
import { QuotesService } from './quotes.service';
import { INestApplication } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { OwnerOnly } from './guard/owner.guard';

const MockQuotesRepository = () => ({
  createQ: jest.fn(),
  updateQ: jest.fn(),
  deleteQ: jest.fn(),
  getSingle: jest.fn(),
  getAllQuotes: jest.fn(),
  getQuotesForFeed: jest.fn()
})

const MockQuoteService = () => ({
  createQuotes: jest.fn(),
  updateQuote: jest.fn(),
  getQuote: jest.fn(),
  getAllQuotes: jest.fn(),
  deleteQuotes: jest.fn(),
  quotesFeed: jest.fn(),
})

describe('QuotesController', () => {
  let app: INestApplication;
  let controller: QuotesController;
  let qservice;
  let qrepo

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotesController],
      providers:[        
        {
          provide: QuotesService,
          useFactory: MockQuoteService
        },
        {
          provide: APP_GUARD,
          useExisting: OwnerOnly
        },
        {
          provide: QuotesResposioty,
          useFactory: MockQuotesRepository
        },
        OwnerOnly
      ]
    }).compile();
    app = module.createNestApplication()
    await app.init()

    controller = await module.resolve(QuotesController);
    qservice = await module.resolve(QuotesService)
    qrepo = await module.resolve(QuotesResposioty)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
