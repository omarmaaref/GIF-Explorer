export abstract class RequestBuilder {
  protected readonly url: URL;

  constructor(baseUrl: string, resource: string) {
    this.url = new URL(`${baseUrl}/api/${resource}`);
  }

  build(): string {
    return this.url.toString();
  }
}
