import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ApplicationException } from '../../../application/common/exceptions/application.exception';
import { ValidationException } from '../../../application/common/exceptions/validation.exception';
import { NotFoundException } from '../../../application/common/exceptions/not-found.exception';
import { ConflictException } from '../../../application/common/exceptions/conflict.exception';
import { UnauthorizedException } from '../../../application/common/exceptions/unauthorized.exception';
import { ForbiddenException } from '../../../application/common/exceptions/forbidden.exception';
import { RequestContext } from '../../../application/common/middleware/request-context';

interface ErrorDetail {
  code: string;
  message: string;
  field?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest & { reqContext?: RequestContext }>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errors: ErrorDetail[] = [];

    if (exception instanceof ApplicationException) {
      const appException = exception;
      if (appException instanceof NotFoundException) {
        status = HttpStatus.NOT_FOUND;
      } else if (appException instanceof ConflictException) {
        status = HttpStatus.CONFLICT;
      } else if (appException instanceof UnauthorizedException) {
        status = HttpStatus.UNAUTHORIZED;
      } else if (appException instanceof ForbiddenException) {
        status = HttpStatus.FORBIDDEN;
      } else if (appException instanceof ValidationException) {
        status = HttpStatus.BAD_REQUEST;
        const valException = appException;
        errors = valException.errors.map((e: { message: string; field?: string }) => {
          const detail: ErrorDetail = {
            code: 'VALIDATION_ERROR',
            message: e.message,
          };
          if (e.field) {
            detail.field = e.field;
          }
          return detail;
        });
      } else {
        status = HttpStatus.BAD_REQUEST;
      }

      if (errors.length === 0) {
        errors.push({
          code: appException.code,
          message: appException.message,
        });
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'object' && res !== null && 'message' in res) {
        const msg = (res as { message: unknown }).message;
        if (Array.isArray(msg)) {
          errors = msg.map((item: unknown) => {
            if (typeof item === 'object' && item !== null && 'field' in item && 'message' in item) {
              return {
                code: 'BAD_REQUEST',
                message: String((item as { message: unknown }).message),
                field: String((item as { field: unknown }).field),
              };
            }
            return {
              code: 'BAD_REQUEST',
              message: String(item),
            };
          });
        } else {
          errors.push({
            code: 'HTTP_ERROR',
            message: String(msg),
          });
        }
      } else {
        errors.push({
          code: 'HTTP_ERROR',
          message: exception.message,
        });
      }
    } else if (exception instanceof Error) {
      this.logger.error(`Unhandled Exception: ${exception.message}`, exception.stack);
      errors.push({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected internal error occurred',
      });
    } else {
      errors.push({
        code: 'UNKNOWN_ERROR',
        message: 'An unknown error occurred',
      });
    }

    const reqCtx = request.reqContext;

    const body: Record<string, unknown> = {
      success: false,
      errors,
      metadata: {
        requestId: reqCtx?.requestId || 'N/A',
        correlationId: reqCtx?.correlationId || 'N/A',
        timestamp: new Date().toISOString(),
      },
    };

    response.status(status).send(body);
  }
}
