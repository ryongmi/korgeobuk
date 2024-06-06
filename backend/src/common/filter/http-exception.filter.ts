import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string[] };

    let logMessage = `${request.method} ${request.url} ${status} \nException Message: ${exception.message}`;

    if (typeof error === 'string') {
      logMessage += `\nResponse  Message: ${error}`;
    } else {
      logMessage += `\nResponse  Message: ${error.message}`;
    }

    this.logger.error(logMessage);
    this.logger.error(error);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
