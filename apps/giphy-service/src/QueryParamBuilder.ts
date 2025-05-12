import { AxiosRequestConfig } from 'axios';
import { RatingEnum } from './giphy/dto/rating';

export class QueryParamBuilder {
  private params: Record<string, any> = {};

  query(q: string): this {
    this.params.q = q;
    return this;
  }

  rating(r: RatingEnum | undefined): this {
    if (r !== RatingEnum.ALL && r) {
      this.params.rating = r.toString();
    }
    console.log('this.params.rating',this.params.rating)
    return this;
  }

  limit(n: number | undefined): this {
    if (n) this.params.limit = n;
    return this;
  }

  offset(n: number | undefined): this {
    if (n) this.params.offset = n;
    return this;
  }

  build(): AxiosRequestConfig {
    return { params: this.params };
  }
}
