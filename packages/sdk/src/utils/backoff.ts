export const calculateBackoff = (attempt: number, baseMs: number, maxMs: number): number => {
  const delay = baseMs * Math.pow(2, attempt - 1);
  return Math.min(delay, maxMs);
};
