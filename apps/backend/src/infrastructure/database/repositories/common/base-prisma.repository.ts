import { PrismaService } from '../../prisma/prisma.service';
import { OffsetPaginationParams, PaginatedResult, PaginationHelper } from './pagination';

export interface TypedModelDelegate<T> {
  upsert(args: { where: Record<string, unknown>; create: T | Record<string, unknown>; update: Partial<T> | Record<string, unknown> }): Promise<T>;
  findUnique(args: { where: Record<string, unknown> }): Promise<T | null>;
  findFirst(args: { where: Record<string, unknown> }): Promise<T | null>;
  findMany(args?: { where?: Record<string, unknown>; skip?: number; take?: number; orderBy?: Record<string, 'asc' | 'desc'> }): Promise<T[]>;
  delete(args: { where: Record<string, unknown> }): Promise<T>;
  deleteMany(args: { where: Record<string, unknown> }): Promise<{ count: number }>;
  count(args?: { where?: Record<string, unknown> }): Promise<number>;
}

export abstract class BasePrismaRepository<TDomain, TPrismaModel> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly modelDelegate: TypedModelDelegate<TPrismaModel>,
  ) {}

  protected abstract toDomain(prismaModel: TPrismaModel): TDomain;
  protected abstract toPrisma(domainEntity: TDomain): Record<string, unknown>;

  protected async paginate(
    params: OffsetPaginationParams,
    whereClause: Record<string, unknown> = {},
  ): Promise<PaginatedResult<TDomain>> {
    const { skip, take } = PaginationHelper.calculateOffset(params.page, params.limit);

    const orderByClause = params.sortBy ? { [params.sortBy]: params.sortOrder ?? 'asc' } : undefined;

    const [total, records] = await Promise.all([
      this.modelDelegate.count({ where: whereClause }),
      this.modelDelegate.findMany(
        orderByClause
          ? { where: whereClause, skip, take, orderBy: orderByClause }
          : { where: whereClause, skip, take },
      ),
    ]);

    const data = records.map((r) => this.toDomain(r));
    const limit = params.limit ?? 10;
    const page = params.page ?? 1;

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
