import { SearchRequestBuilder } from "../services/SearchRequestBuilder";
import { TrendingRequestBuilder } from "../services/TrendingRequestBuilder";
import type { RatingEnum } from "../types/rating";

const baseUrl = import.meta.env.VITE_API_URL;

export async function fetchTrending(page: number, limit: number){
    const uri= (new TrendingRequestBuilder(baseUrl)).
    page(page).
    limit(limit).
    build();
    const res= await fetch(uri);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}
export async function fetchSearch(query: string, page: number, limit: number, rating: RatingEnum ){
    const uri= (new SearchRequestBuilder(baseUrl)).
    page(page).
    limit(limit).
    query(query).
    rating(rating).
    build();
    const res= await fetch(uri);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
} 
