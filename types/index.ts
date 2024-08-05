interface Score {
  year: number;
  value: number | null;
}

interface CountryData {
  country: string;
  scores: Score[];
}

export type {Score, CountryData}