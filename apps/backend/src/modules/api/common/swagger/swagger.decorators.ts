import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiStandardResponse = <TModel extends Type<unknown>>(model?: TModel) => {
  if (model) {
    return applyDecorators(
      ApiExtraModels(model),
      ApiOkResponse({
        schema: {
          properties: {
            success: { type: 'boolean', example: true },
            data: { $ref: getSchemaPath(model) },
            metadata: {
              type: 'object',
              properties: {
                requestId: { type: 'string', example: 'req_123' },
                correlationId: { type: 'string', example: 'corr_456' },
                timestamp: { type: 'string', example: '2026-07-31T12:00:00.000Z' },
                duration: { type: 'number', example: 15 },
              },
            },
          },
        },
      }),
    );
  }
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          success: { type: 'boolean', example: true },
          metadata: {
            type: 'object',
            properties: {
              requestId: { type: 'string', example: 'req_123' },
              correlationId: { type: 'string', example: 'corr_456' },
              timestamp: { type: 'string', example: '2026-07-31T12:00:00.000Z' },
              duration: { type: 'number', example: 15 },
            },
          },
        },
      },
    }),
  );
};
