import { AppModule } from './app.module';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
// import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionFilter } from './config/filters/all-exception.filter';
import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from './config/logging/logging.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  app.setGlobalPrefix('api');
  const httpAdapter = app.get(HttpAdapterHost);
  const logger = new Logger();
  // app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(port, () => {
    console.log(`app start port ${port}`);
  });
}
bootstrap();
