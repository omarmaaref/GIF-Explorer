export enum RatingEnum {
  ALL= 'all',
  G = 'g',
  PG = 'pg',
  PG13 = 'pg-13'
}

export const ratingLabels: Record<RatingEnum, string> = {
  [RatingEnum.ALL]:   'All Ratings',
  [RatingEnum.G]:     'G – General Audiences',
  [RatingEnum.PG]:    'PG – Parental Guidance Suggested',
  [RatingEnum.PG13]:  'PG-13 – Parents Strongly Cautioned'
};