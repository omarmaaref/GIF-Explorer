import { RatingEnum } from "../types/rating";
import { RequestBuilder } from "./RequestBuilder";

export class SearchRequestBuilder extends RequestBuilder {
  constructor(baseUrl: string) {
    super(baseUrl,"search");
  }

  query(q: string) {
    this.url.searchParams.set('query', encodeURIComponent(q));
    return this;
  }

  page(p: number) {
    this.url.searchParams.set('page', String(p));
    return this;
  }

  limit(l: number) {
    this.url.searchParams.set('limit', String(l));
    return this;
  }

  rating(rating: RatingEnum) {
    if (rating != RatingEnum.ALL) {
      this.url.searchParams.set('rating', rating);
    }
    return this;
  }
}
