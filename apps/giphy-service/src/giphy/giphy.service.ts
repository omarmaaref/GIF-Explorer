import {
  Injectable,
  Logger,
  BadRequestException,
  BadGatewayException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { PaginationDto } from './dto/paginationDto';
import { SearchDto } from './dto/searchQueryDto';
import GifDto from './dto/gifDto';
import { QueryParamBuilder } from '../QueryParamBuilder';

@Injectable()
export class GiphyService {
  private readonly defaultLimit: number | undefined;
  private readonly logger = new Logger(GiphyService.name);

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.defaultLimit = config.get<number>('defaultLimit');
  }

  private toOffset(page: number, limit: number = 0) {
    return (page - 1) * limit;
  }

  private transform(item: any): GifDto {
    const {
      id,
      title,
      images,
    }: {
      id: string;
      title: string;
      images: { downsized: { url: string; width: string; height: string } };
    } = item;
    const { url, width, height } = images.downsized;
    return {
      id,
      title,
      url,
      width: +width,
      height: +height,
    };
  }

  async fetchTrending(qp: PaginationDto): Promise<GifDto[]> {
    const limit = qp.limit ?? this.defaultLimit;
    const offset = this.toOffset(qp.page, limit);

    this.logger.debug(`Fetching trending: offset=${offset}, limit=${limit}`);

    try {
      const resp = await firstValueFrom(
        this.http.get(
          '/trending',
          new QueryParamBuilder().limit(limit).offset(offset).build(),
        ),
      );
      return resp.data.data.map((i: any) => this.transform(i));
    } catch (err) {
      this.handleHttpError(err, 'fetchTrending');
    }
  }

  async searchGifs(sq: SearchDto): Promise<GifDto[]> {
    const limit = sq.limit ?? this.defaultLimit;
    const offset = this.toOffset(sq.page, limit);
    this.logger.debug(
      `Searching "${sq.query}": offset=${offset}, limit=${limit}, rating=${sq.rating}`,
    );

    try {
      const resp = await firstValueFrom(
        this.http.get(
          '/search',
          new QueryParamBuilder()
            .limit(limit)
            .offset(offset)
            .query(sq.query)
            .rating(sq.rating)
            .build(),
        ),
      );
      return resp.data.data.map((i: any) => this.transform(i));
    } catch (err) {
      this.handleHttpError(err, 'searchGifs');
    }
  }

  /**
   * Centralized error handler for HTTP calls.
   * - Logs the full error.
   * - Throws a Nest exception based on AxiosError details.
   */
  private handleHttpError(error: unknown, method: string): never {
    // Log full stack for debugging
    console.error(error, method);
    const message = error instanceof Error ? error.message : 'Unknown error';
    const stack = error instanceof Error ? error.stack : '';
    this.logger.error(`Error in ${method}: ${message}`, stack);

    // If it's an AxiosError, we can extract status & data
    if ((error as AxiosError).isAxiosError) {
      const axiosErr = error as AxiosError;
      const status = axiosErr.response?.status;
      const dataMsg = axiosErr.response?.data;

      if (status && status >= 400 && status < 500) {
        throw new BadRequestException(
          dataMsg || 'Invalid request to Giphy API',
        );
      }
      throw new BadGatewayException('Giphy API is unavailable');
    }

    // Fallback
    throw new InternalServerErrorException('Unexpected error fetching GIFs');
  }
}
