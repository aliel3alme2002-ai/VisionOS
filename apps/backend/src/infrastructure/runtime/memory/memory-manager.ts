import { Injectable } from '@nestjs/common';

@Injectable()
export class MemoryManager {
  private allocatedRAMMb = 0;
  private allocatedVRAMMb = 0;

  public allocateRAM(sizeMb: number): boolean {
    this.allocatedRAMMb += sizeMb;
    return true;
  }

  public releaseRAM(sizeMb: number): void {
    this.allocatedRAMMb = Math.max(0, this.allocatedRAMMb - sizeMb);
  }

  public allocateVRAM(sizeMb: number): boolean {
    this.allocatedVRAMMb += sizeMb;
    return true;
  }

  public releaseVRAM(sizeMb: number): void {
    this.allocatedVRAMMb = Math.max(0, this.allocatedVRAMMb - sizeMb);
  }

  public getRAMUsage(): number {
    return this.allocatedRAMMb;
  }

  public getVRAMUsage(): number {
    return this.allocatedVRAMMb;
  }
}
