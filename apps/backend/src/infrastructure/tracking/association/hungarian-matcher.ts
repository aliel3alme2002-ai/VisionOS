import { Injectable } from '@nestjs/common';

export interface MatchResult {
  matches: Array<[number, number]>;
  unmatchedTracks: number[];
  unmatchedDetections: number[];
}

@Injectable()
export class HungarianMatcher {
  public solve(costMatrix: number[][], maxCost = 0.55, numCols?: number): MatchResult {
    const rows = costMatrix.length;
    const cols = numCols ?? (costMatrix[0]?.length ?? 0);

    if (rows === 0 || cols === 0) {
      return {
        matches: [],
        unmatchedTracks: Array.from({ length: rows }, (_, i) => i),
        unmatchedDetections: Array.from({ length: cols }, (_, j) => j),
      };
    }

    const matches: Array<[number, number]> = [];
    const matchedTracks = new Set<number>();
    const matchedDetections = new Set<number>();

    // Greedy Hungarian Approximation for Bipartite Matching
    const pairs: Array<{ row: number; col: number; cost: number }> = [];

    for (let r = 0; r < rows; r++) {
      const row = costMatrix[r];
      if (!row) continue;

      for (let c = 0; c < cols; c++) {
        const cost = row[c];
        if (cost !== undefined && cost <= maxCost) {
          pairs.push({ row: r, col: c, cost });
        }
      }
    }

    pairs.sort((a, b) => a.cost - b.cost);

    for (const pair of pairs) {
      if (!matchedTracks.has(pair.row) && !matchedDetections.has(pair.col)) {
        matchedTracks.add(pair.row);
        matchedDetections.add(pair.col);
        matches.push([pair.row, pair.col]);
      }
    }

    const unmatchedTracks: number[] = [];
    for (let r = 0; r < rows; r++) {
      if (!matchedTracks.has(r)) unmatchedTracks.push(r);
    }

    const unmatchedDetections: number[] = [];
    for (let c = 0; c < cols; c++) {
      if (!matchedDetections.has(c)) unmatchedDetections.push(c);
    }

    return { matches, unmatchedTracks, unmatchedDetections };
  }
}
