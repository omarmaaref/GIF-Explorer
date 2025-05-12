// src/services/giphyService.ts
import { fetchTrending, fetchSearch } from "../api/BaseClient";
import Gif from "../types/gif";
import type { RatingEnum } from "../types/rating";

export class GiphyService {
  async getTrending(page: number, limit = 12): Promise<Gif[]> {
    const data = await fetchTrending(page, limit);
    return data;
  }

  async searchGifs(q: string, page: number, limit = 12, rating: RatingEnum): Promise<Gif[]> {
    const data = await fetchSearch(q, page, limit, rating);
    return data;
  }
}


export const giphyService = new GiphyService();
