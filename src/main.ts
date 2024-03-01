import { AppModule } from './app/app.module';
// import { HttpExceptionFilter } from './filters/http-exception.filter';
// import { AllExceptionFilter } from './config/filters/all-exception.filter';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './configs/logging/logging.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  // const httpAdapter = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new HttpExceptionFilter(logger));
  // app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const globalPrefix: string = configService.get<string>('app.globalPrefix');
  const host: string = configService.get<string>('app.http.host');
  const port: number = configService.get<number>('app.http.port');
  // const env: string = configService.get<string>('app.env');
  // const tz: string = configService.get<string>('app.tz');
  // enable
  const httpEnable: boolean = configService.get<boolean>('app.http.enable');
  const versionEnable: string = configService.get<string>(
    'app.versioning.enable',
  );
  const jobEnable: boolean = configService.get<boolean>('app.jobEnable');
  app.setGlobalPrefix(globalPrefix);
  // await app.listen(port, host);
  await app.listen(port, () => {
    console.log(`app start port ${port}`);
  });
  logger.log(`==========================================================`);
  logger.log(`Environment Variable`, 'NestApplication');
  // logger.log(JSON.parse(JSON.stringify(process.env)), 'NestApplication');

  logger.log(`==========================================================`);
  logger.log(`Job is ${jobEnable}`, 'NestApplication');
  logger.log(
    `Http is ${httpEnable}, ${
      httpEnable ? 'routes registered' : 'no routes registered'
    }`,
    'NestApplication',
  );
  logger.log(`Http versioning is ${versionEnable}`, 'NestApplication');
  logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
  // logger.log(`Database uri ${databaseUri}`, 'NestApplication');
  logger.log(`==========================================================`);
}
bootstrap();
