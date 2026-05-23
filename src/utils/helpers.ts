export function formatScore(score: number): string {
  return score.toFixed(2);
}

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
