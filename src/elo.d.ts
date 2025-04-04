declare module '@/elo' {
  export function expectAndNewRating(ratingA: number, ratingB: number, matchResult: number): [number, number];
} 