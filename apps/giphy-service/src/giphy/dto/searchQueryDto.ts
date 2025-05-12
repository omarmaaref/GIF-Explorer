import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './paginationDto';
import { RatingEnum } from './rating';
export class SearchDto extends PaginationDto {
  @IsString()
  query: string = '';

  @IsOptional()
  @IsEnum(RatingEnum)
  rating: RatingEnum;
}
