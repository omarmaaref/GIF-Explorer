import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { PaginationDto } from './dto/paginationDto';
import { GiphyService } from './giphy.service';
import GifDto from './dto/gifDto';
import { SearchDto } from './dto/searchQueryDto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller()
@UseInterceptors(CacheInterceptor)
export class GiphyController {
  constructor(private giphyAPIservice: GiphyService) {}
  @Get('trending')
  @CacheTTL(60)
  findTrending(@Query() paginationQuery: PaginationDto): Promise<GifDto[]> {
    return this.giphyAPIservice.fetchTrending(paginationQuery);
  }

  @Get('search')
  search(@Query() searchQuery: SearchDto): Promise<GifDto[]> {
    return this.giphyAPIservice.searchGifs(searchQuery);
  }
}
