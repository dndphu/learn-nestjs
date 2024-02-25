import {
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

// import * as requestIp from 'request-ip';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
//   responseHandler(res: any, context: any) {
//     const ctx = context.switchToHttp();
//     const response = ctx.getResponse();
//     const request = ctx.getRequest();
//     console.log('co do day k?');
//     const statusCode = response.statusCode;
//     return {
//       status: true,
//       path: request.url,
//       statusCode,
//       result: res,
//     };
//   }
  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    // const request = ctx.getRequest();
    const response = ctx.getResponse();
    // console.log('response :>> ', response);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      //   headers: request.headers,
      //   query: request.query,
      //   body: request.body,
      //   params: request.params,
      //   timestamp: new Date().toISOString(),
      //   ip: requestIp.getClientIp(request),
      //   exceptioin: exception['name'],
      //   error: exception['response'] || 'Internal Server Error',
      statusCode: httpStatus,
      statusMessage: exception.message || 'Internal Server Error',
    };

    this.logger.error('[toimc]', responseBody);
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
