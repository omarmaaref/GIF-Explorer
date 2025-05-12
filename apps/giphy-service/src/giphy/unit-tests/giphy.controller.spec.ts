import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import * as request from 'supertest';
import { PaginationDto } from '../dto/paginationDto';
import GifDto from '../dto/gifDto';
import { GiphyController } from '../giphy.controller';
import { GiphyService } from '../giphy.service';

describe('GiphyController (E2E caching)', () => {
  let app: INestApplication;
  let serviceFetchTrending: jest.Mock<Promise<GifDto[]>, [PaginationDto]>;

  const gifMock: GifDto[] = [
    { id: '1', title: 'foo', url: 'http://u', width: 100, height: 100 },
  ];

  beforeAll(async () => {
    serviceFetchTrending = jest.fn().mockResolvedValue(gifMock);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register({ ttl: 60 })],
      controllers: [GiphyController],
      providers: [
        {
          provide: GiphyService,
          useValue: {
            fetchTrending: serviceFetchTrending,
            searchGifs: jest.fn(),
          },
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: CacheInterceptor,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should cache the /trending response', async () => {
    const query = { page: 1, limit: 5 };

    // First request => cache miss => service called once
    await request(app.getHttpServer())
      .get('/trending')
      .query(query)
      .expect(200, gifMock);
    expect(serviceFetchTrending).toHaveBeenCalledTimes(1);

    // Second request with the same query => cache hit => service still called only once
    await request(app.getHttpServer())
      .get('/trending')
      .query(query)
      .expect(200, gifMock);
    expect(serviceFetchTrending).toHaveBeenCalledTimes(1);
  });
});
