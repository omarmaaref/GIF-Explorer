export enum RatingEnum {
  ALL,
  G,
  PG,
  PG13,
}

export const ratingLabels: Record<RatingEnum, string> = {
  [RatingEnum.ALL]:   'All Ratings',
  [RatingEnum.G]:     'G – General Audiences',
  [RatingEnum.PG]:    'PG – Parental Guidance Suggested',
  [RatingEnum.PG13]:  'PG-13 – Parents Strongly Cautioned',
};