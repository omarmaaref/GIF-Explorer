// giphy/giphy.service.spec.ts
import { of, throwError } from 'rxjs';
import { AxiosError } from 'axios';
import {
  BadRequestException,
  BadGatewayException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GiphyService } from '../giphy.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from '../dto/paginationDto';
import { SearchDto } from '../dto/searchQueryDto';
import GifDto from '../dto/gifDto';
import { RatingEnum } from '../dto/rating';

describe('GiphyService', () => {
  let service: GiphyService;
  let httpService: Partial<HttpService>;
  let configService: Partial<ConfigService>;

  beforeEach(() => {
    httpService = {
      get: jest.fn(),
    };
    // defaultLimit = 10 when not provided in DTO
    configService = {
      get: jest.fn().mockReturnValue(10),
    };
    service = new GiphyService(
      httpService as HttpService,
      configService as ConfigService,
    );
  });

  describe('fetchTrending', () => {
    const dto: PaginationDto = { page: 2, limit: 5 };

    it('returns mapped GifDto[] on success', async () => {
      const raw = {
        id: 'abc',
        title: 'funny',
        images: { downsized: { url: 'u', width: '100', height: '200' } },
      };
      (httpService.get as jest.Mock).mockReturnValue(
        of({ data: { data: [raw] } }),
      );

      const result = await service.fetchTrending(dto);

      expect(httpService.get).toHaveBeenCalledWith('/trending', {
        params: { limit: 5, offset: 5 },
      });
      expect(result).toEqual<GifDto[]>([
        { id: 'abc', title: 'funny', url: 'u', width: 100, height: 200 },
      ]);
    });

    it('throws BadRequestException on 4xx AxiosError', async () => {
      const axiosErr = {
        isAxiosError: true,
        response: { status: 422, data: { message: 'invalid params' } },
      } as AxiosError;
      (httpService.get as jest.Mock).mockReturnValue(
        throwError(() => axiosErr),
      );

      await expect(service.fetchTrending(dto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.fetchTrending(dto)).rejects.toThrow(
        'invalid params',
      );
    });

    it('throws BadGatewayException on 5xx AxiosError', async () => {
      const axiosErr = {
        isAxiosError: true,
        response: { status: 503, data: {} },
      } as AxiosError;
      (httpService.get as jest.Mock).mockReturnValue(
        throwError(() => axiosErr),
      );

      await expect(service.fetchTrending(dto)).rejects.toThrow(
        BadGatewayException,
      );
      await expect(service.fetchTrending(dto)).rejects.toThrow(
        'Giphy API is unavailable',
      );
    });

    it('throws InternalServerErrorException on non-Axios Error', async () => {
      (httpService.get as jest.Mock).mockReturnValue(
        throwError(() => new Error('oops')),
      );

      await expect(service.fetchTrending(dto)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.fetchTrending(dto)).rejects.toThrow(
        'Unexpected error fetching GIFs',
      );
    });
  });

  describe('searchGifs', () => {
    const dto: SearchDto = {
      query: 'cats',
      rating: RatingEnum.G,
      page: 1,
      limit: undefined,
    };

    it('returns mapped GifDto[] on success (uses defaultLimit)', async () => {
      const raw = {
        id: 'xyz',
        title: 'cute cat',
        images: { downsized: { url: 'v', width: '50', height: '75' } },
      };
      (httpService.get as jest.Mock).mockReturnValue(
        of({ data: { data: [raw] } }),
      );

      const result = await service.searchGifs(dto);

      expect(httpService.get).toHaveBeenCalledWith('/search', {
        params: { q: 'cats', rating: 'g', limit: 10 },
      });
      expect(result).toEqual<GifDto[]>([
        { id: 'xyz', title: 'cute cat', url: 'v', width: 50, height: 75 },
      ]);
    });

    it('throws BadRequestException on 4xx AxiosError', async () => {
      const axiosErr = {
        isAxiosError: true,
        response: { status: 400, data: { message: 'bad query' } },
      } as AxiosError;
      (httpService.get as jest.Mock).mockReturnValue(
        throwError(() => axiosErr),
      );

      await expect(service.searchGifs(dto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.searchGifs(dto)).rejects.toThrow('bad query');
    });

    it('throws BadGatewayException on 5xx AxiosError', async () => {
      const axiosErr = {
        isAxiosError: true,
        response: { status: 502, data: {} },
      } as AxiosError;
      (httpService.get as jest.Mock).mockReturnValue(
        throwError(() => axiosErr),
      );

      await expect(service.searchGifs(dto)).rejects.toThrow(
        BadGatewayException,
      );
    });

    it('throws InternalServerErrorException on non-Axios Error', async () => {
      (httpService.get as jest.Mock).mockReturnValue(
        throwError(() => new Error('network down')),
      );

      await expect(service.searchGifs(dto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
