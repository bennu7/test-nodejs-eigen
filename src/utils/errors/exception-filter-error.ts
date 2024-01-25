import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException, HttpException, NotFoundException, NotFoundException)
export class ExceptionFilterCustom implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errors = exception.getResponse() as any;
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    return response.status(status).json({
      statusCode: status,
      path: request.url,
      message: exception.message,
      details: Array.isArray(errors.message)
        ? errors.message.map((err) => ({
            property: err?.property,
            message: err?.message,
          }))
        : '',
    });
  }
}
