export * from './json';

export declare const UUIDBrand: unique symbol;

export type UUID = string & {
  readonly [UUIDBrand]: true;
};

export type ISODateString = string;

export interface Pagination {
  readonly page: number;
  readonly limit: number;
  readonly total?: number;
  readonly totalPages?: number;
  readonly hasNext?: boolean;
  readonly hasPrevious?: boolean;
}

export type SortDirection = 'asc' | 'desc';

export interface Coordinates {
  readonly latitude: number;
  readonly longitude: number;
}

export interface BoundingBox {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}
