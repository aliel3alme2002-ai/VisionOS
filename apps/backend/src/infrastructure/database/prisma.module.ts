import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Export an injection token for DatabaseClient if we want strict decoupling,
// but since PrismaService implements it, we can provide it directly or alias it.
export const DATABASE_CLIENT = Symbol('DATABASE_CLIENT');

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: DATABASE_CLIENT,
      useExisting: PrismaService,
    },
  ],
  exports: [PrismaService, DATABASE_CLIENT],
})
export class PrismaModule {}
