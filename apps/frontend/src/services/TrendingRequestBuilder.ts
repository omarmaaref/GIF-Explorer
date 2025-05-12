import { RequestBuilder } from "./RequestBuilder";

export class TrendingRequestBuilder extends RequestBuilder {
  constructor(baseUrl: string) {
    super(baseUrl,"trending");
  }

  page(p: number) {
    this.url.searchParams.set('page', String(p));
    return this;
  }

  limit(l: number) {
    this.url.searchParams.set('limit', String(l));
    return this;
  }
}