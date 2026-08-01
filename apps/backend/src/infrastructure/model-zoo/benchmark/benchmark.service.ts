import { Injectable } from '@nestjs/common';
import { BenchmarkResult } from './benchmark-result';

@Injectable()
export class BenchmarkService {
  private readonly benchmarks: Map<string, BenchmarkResult[]> = new Map();

  public recordBenchmark(result: BenchmarkResult): void {
    const list = this.benchmarks.get(result.modelId) ?? [];
    list.push(result);
    this.benchmarks.set(result.modelId, list);
  }

  public getBenchmarks(modelId: string): BenchmarkResult[] {
    return this.benchmarks.get(modelId) ?? [];
  }

  public getLatestBenchmark(modelId: string): BenchmarkResult | null {
    const list = this.getBenchmarks(modelId);
    if (list.length === 0) return null;
    return list[list.length - 1] ?? null;
  }
}
